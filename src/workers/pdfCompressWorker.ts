// src/workers/pdfCompressWorker.ts
// Redesigned: receives raw RGBA pixel buffers (transferred from main thread),
// runs binary-search quality selection entirely off the main thread,
// and returns final JPEG ArrayBuffers as transferables.
//
// Main thread flow:
//   1. Render pages one-at-a-time (canvas → ImageData → grab buffer → canvas.width=0)
//   2. postMessage all RGBA buffers with transfer list (zero-copy)
//   3. Listen for PROGRESS / WARNING / SUCCESS / ERROR
//   4. On SUCCESS: embed jpegs into pdf-lib document and download

import { encode } from '@jsquash/jpeg';

interface WorkerInput {
  type: 'COMPRESS_EXTREME';
  payload: {
    pageRGBABuffers: ArrayBuffer[]; // raw pixel data, transferred (Uint8ClampedArray.buffer)
    widths: number[];
    heights: number[];
    targetBytes: number;
  };
}

async function estimateTotalSize(
  pageRGBABuffers: ArrayBuffer[],
  widths: number[],
  heights: number[],
  quality: number
): Promise<number> {
  let total = 0;
  for (let i = 0; i < pageRGBABuffers.length; i++) {
    const imgData = new ImageData(
      new Uint8ClampedArray(pageRGBABuffers[i]),
      widths[i],
      heights[i]
    );
    const jpg = await encode(imgData, { quality });
    total += jpg.byteLength;
  }
  // Add per-page PDF structural overhead estimate
  total += pageRGBABuffers.length * 512;
  return total;
}

async function encodeAllPages(
  pageRGBABuffers: ArrayBuffer[],
  widths: number[],
  heights: number[],
  quality: number
): Promise<ArrayBuffer[]> {
  const results: ArrayBuffer[] = [];
  for (let i = 0; i < pageRGBABuffers.length; i++) {
    const imgData = new ImageData(
      new Uint8ClampedArray(pageRGBABuffers[i]),
      widths[i],
      heights[i]
    );
    const jpg = await encode(imgData, { quality });
    results.push(jpg);
  }
  return results;
}

self.onmessage = async (e: MessageEvent<WorkerInput>) => {
  try {
    const { type, payload } = e.data;

    if (type !== 'COMPRESS_EXTREME') return;

    const { pageRGBABuffers, widths, heights, targetBytes } = payload;
    const numPages = pageRGBABuffers.length;

    self.postMessage({ type: 'PROGRESS', payload: { progress: 5, text: 'Searching optimal quality…' } });

    // Binary search over quality 15–100 to find the highest quality that meets the target.
    let lo = 15, hi = 100;
    let bestQuality = 15; // absolute fallback

    const MAX_STEPS = 7; // log₂(100) ≈ 7
    for (let step = 0; step < MAX_STEPS; step++) {
      if (lo > hi) break;
      const mid = (lo + hi) >> 1;

      self.postMessage({
        type: 'PROGRESS',
        payload: {
          progress: 10 + (step / MAX_STEPS) * 60,
          text: `Testing quality ${mid}% (step ${step + 1}/${MAX_STEPS})…`,
        },
      });

      const size = await estimateTotalSize(pageRGBABuffers, widths, heights, mid);

      if (size <= targetBytes) {
        bestQuality = mid;
        lo = mid + 1; // can we do better (higher quality)?
      } else {
        hi = mid - 1; // need to compress more
      }
    }

    // If even quality 15 doesn't meet the target, warn the user.
    if (bestQuality === 15) {
      const minSize = await estimateTotalSize(pageRGBABuffers, widths, heights, 15);
      if (minSize > targetBytes) {
        (self as unknown as Worker).postMessage({
          type: 'WARNING',
          payload: { message: `Target size unreachable — using minimum readable quality (15%). Result may be ${(minSize / 1024).toFixed(0)} KB.` },
        });
      }
    }

    self.postMessage({
      type: 'PROGRESS',
      payload: { progress: 75, text: `Encoding all ${numPages} pages at quality ${bestQuality}%…` },
    });

    const finalJpegs = await encodeAllPages(pageRGBABuffers, widths, heights, bestQuality);

    self.postMessage({ type: 'PROGRESS', payload: { progress: 98, text: 'Done encoding — rebuilding PDF…' } });

    // Transfer final JPEG buffers to avoid copying back to main thread
    (self as unknown as Worker).postMessage(
      { type: 'SUCCESS', payload: { jpegs: finalJpegs, bestQuality } },
      finalJpegs
    );
  } catch (error: any) {
    (self as unknown as Worker).postMessage({
      type: 'ERROR',
      payload: { error: error?.message ?? String(error) },
    });
  }
};

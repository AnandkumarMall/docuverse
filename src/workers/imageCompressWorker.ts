// src/workers/imageCompressWorker.ts
// Redesigned: uses OffscreenCanvas to decode, scale, and binary-search compress
// images entirely off the main thread.
//
// Message types:
//
//   FIND_BEST_QUALITY — target-size search
//     payload: { imageBuffer: ArrayBuffer, mimeType: string, targetBytes: number, outputFormat: 'image/jpeg' | 'image/webp' }
//     response SUCCESS: { buffer: ArrayBuffer, quality: number, scale: number, found: boolean }
//
//   COMPRESS_SINGLE — encode pre-supplied RGBA at a known quality
//     payload: { rgbaBuffer: ArrayBuffer, width: number, height: number, quality: number, format: 'image/jpeg' | 'image/webp' }
//     response SUCCESS: { buffer: ArrayBuffer }

import { encode as encodeJpeg } from '@jsquash/jpeg';
import { encode as encodeWebp } from '@jsquash/webp';
import { optimise as optimisePng } from '@jsquash/oxipng';

const MIN_ACCEPTABLE_QUALITY = 60; // below this, prefer reducing scale instead

async function encodeImageData(
  imgData: ImageData,
  quality: number,
  format: string
): Promise<ArrayBuffer> {
  if (format === 'image/jpeg') {
    return encodeJpeg(imgData, { quality });
  } else if (format === 'image/webp') {
    return encodeWebp(imgData, { quality });
  } else if (format === 'image/png') {
    // PNG is lossless. Use the JPEG encoder as fallback since we can't create
    // a PNG ArrayBuffer from ImageData without a separate encoder in this context.
    // oxipng.optimise expects existing PNG bytes, not raw RGBA.
    // For now, treat PNG target-size as JPEG compression for compatibility.
    return encodeJpeg(imgData, { quality: 85 });
  }
  throw new Error(`Unsupported output format: ${format}`);
}


self.onmessage = async (e: MessageEvent) => {
  try {
    const { type, payload } = e.data;

    // ────────────────────────────────────────────────────────────────
    // FIND_BEST_QUALITY: full target-size binary search via OffscreenCanvas
    // ────────────────────────────────────────────────────────────────
    if (type === 'FIND_BEST_QUALITY') {
      const { imageBuffer, mimeType, targetBytes, outputFormat } = payload as {
        imageBuffer: ArrayBuffer;
        mimeType: string;
        targetBytes: number;
        outputFormat: string;
      };

      // Decode the source image into an ImageBitmap (GPU-backed, no main thread)
      const blob = new Blob([imageBuffer], { type: mimeType });
      const bitmap = await createImageBitmap(blob);

      const scalesToTest = [1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1];
      const BINARY_STEPS = 7;
      const totalSteps = scalesToTest.length * BINARY_STEPS;
      let step = 0;

      let bestQuality = 5;
      let bestScale = 0.1;
      let bestBuffer: ArrayBuffer | null = null;
      let found = false;

      outer: for (const scale of scalesToTest) {
        const w = Math.max(1, Math.floor(bitmap.width * scale));
        const h = Math.max(1, Math.floor(bitmap.height * scale));

        // Draw at target scale onto an OffscreenCanvas
        const canvas = new OffscreenCanvas(w, h);
        const ctx = canvas.getContext('2d') as OffscreenCanvasRenderingContext2D;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, w, h);
        ctx.drawImage(bitmap, 0, 0, w, h);
        const imageData = ctx.getImageData(0, 0, w, h);

        // For PNG, no quality to search — just encode and check
        if (outputFormat === 'image/png') {
          const buf = await encodeImageData(imageData, 0, 'image/png');
          step = totalSteps;
          self.postMessage({ type: 'PROGRESS', payload: { progress: 95 } });
          if (buf.byteLength <= targetBytes) {
            bestBuffer = buf;
            bestQuality = 100;
            bestScale = scale;
            found = true;
          }
          break outer;
        }

        // Binary search quality at this scale
        let lo = 1, hi = 100;
        let localBestQ = 0;
        let localBestBuf: ArrayBuffer | null = null;

        for (let i = 0; i < BINARY_STEPS; i++) {
          step++;
          if (lo > hi) { step += BINARY_STEPS - i - 1; break; }
          const mid = (lo + hi) >> 1;

          self.postMessage({
            type: 'PROGRESS',
            payload: { progress: Math.min(90, (step / totalSteps) * 100) },
          });

          const buf = await encodeImageData(imageData, mid, outputFormat);

          if (buf.byteLength <= targetBytes) {
            localBestQ = mid;
            localBestBuf = buf;
            lo = mid + 1; // try higher quality
          } else {
            hi = mid - 1; // need more compression
          }
        }

        // If we found a good quality at this scale, we're done
        if (localBestQ >= MIN_ACCEPTABLE_QUALITY && localBestBuf) {
          bestQuality = localBestQ;
          bestScale = scale;
          bestBuffer = localBestBuf;
          found = true;
          break outer;
        }

        // Keep as fallback even if quality is low
        if (localBestQ > 0 && localBestBuf) {
          bestQuality = localBestQ;
          bestScale = scale;
          bestBuffer = localBestBuf;
        }
      }

      bitmap.close();

      // Absolute fallback: encode at scale 0.1, quality 5
      if (!bestBuffer) {
        const w = Math.max(1, Math.floor(bitmap.width * 0.1));
        const h = Math.max(1, Math.floor(bitmap.height * 0.1));
        const canvas = new OffscreenCanvas(w, h);
        const ctx = canvas.getContext('2d') as OffscreenCanvasRenderingContext2D;
        ctx.drawImage(bitmap, 0, 0, w, h);
        const imageData = ctx.getImageData(0, 0, w, h);
        bestBuffer = await encodeImageData(imageData, 5, outputFormat === 'image/png' ? 'image/jpeg' : outputFormat);
        bestQuality = 5;
        bestScale = 0.1;
      }

      self.postMessage({ type: 'PROGRESS', payload: { progress: 100 } });

      (self as unknown as Worker).postMessage(
        { type: 'SUCCESS', payload: { buffer: bestBuffer, quality: bestQuality, scale: bestScale, found } },
        [bestBuffer]
      );
      return;
    }

    // ────────────────────────────────────────────────────────────────
    // COMPRESS_SINGLE: encode pre-supplied RGBA at a known quality
    // ────────────────────────────────────────────────────────────────
    if (type === 'COMPRESS_SINGLE') {
      const { rgbaBuffer, width, height, quality, format } = payload as {
        rgbaBuffer: ArrayBuffer;
        width: number;
        height: number;
        quality: number;
        format: string;
      };

      const imageData = new ImageData(new Uint8ClampedArray(rgbaBuffer), width, height);
      const buffer = await encodeImageData(imageData, quality, format);

      (self as unknown as Worker).postMessage(
        { type: 'SUCCESS', payload: { buffer } },
        [buffer]
      );
      return;
    }
  } catch (error: any) {
    (self as unknown as Worker).postMessage({
      type: 'ERROR',
      payload: { error: error?.message ?? String(error) },
    });
  }
};

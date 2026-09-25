import { encode } from '@jsquash/jpeg';

self.onmessage = async (e: MessageEvent) => {
  try {
    const { type, payload } = e.data;
    
    if (type === 'COMPRESS_EXTREME') {
      const { pageImages, targetBytes, numPages } = payload;
      // pageImages is an array of { imageData: ImageData, width: number, height: number }
      
      let bestJpegs: Uint8Array[] | null = null;
      let bestSize = Infinity;
      const qualities = [90, 80, 70, 60, 50, 40, 30, 20, 10];
      let found = false;
      
      for (let i = 0; i < qualities.length; i++) {
        const q = qualities[i];
        
        self.postMessage({
          type: 'PROGRESS',
          payload: {
            progress: 30 + ((i / qualities.length) * 40),
            text: `Testing compression strength (${100 - q}%)...`
          }
        });
        
        let totalBytes = 0;
        const currentJpegs: Uint8Array[] = [];
        
        for (const p of pageImages) {
          // JSQuash is fully synchronous in the WASM, but its wrapper is async
          // Running this in the worker prevents main thread UI freezing!
          const jpg = await encode(p.imageData, { quality: q });
          currentJpegs.push(new Uint8Array(jpg));
          totalBytes += jpg.byteLength;
        }
        
        const estimatedOverhead = numPages * 1024; // 1KB per page overhead
        const estPdfSize = totalBytes + estimatedOverhead;
        
        // Keep the smallest we've seen if we don't hit target
        if (estPdfSize < bestSize) {
          bestSize = estPdfSize;
          bestJpegs = currentJpegs;
        }
        
        if (estPdfSize <= targetBytes) {
          found = true;
          break;
        }
      }
      
      if (!found) {
        self.postMessage({ type: 'WARNING', payload: { message: 'Could not reach strict target size, using max compression.' }});
      }
      
      // We must map bestJpegs to ArrayBuffers to transfer them back efficiently
      const buffers = bestJpegs!.map(arr => arr.buffer);
      
      (self as unknown as Worker).postMessage({ 
        type: 'SUCCESS', 
        payload: { bestJpegs } 
      }, buffers);
    }
  } catch (error: any) {
    (self as unknown as Worker).postMessage({ type: 'ERROR', payload: { error: error.message } });
  }
};

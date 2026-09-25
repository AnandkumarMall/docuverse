import { encode as encodeJpeg } from '@jsquash/jpeg';
import { encode as encodeWebp } from '@jsquash/webp';
import { optimise as optimisePng } from '@jsquash/png';

self.onmessage = async (e: MessageEvent) => {
  try {
    const { type, payload } = e.data;
    
    if (type === 'COMPRESS_IMAGE') {
      const { imageData, quality, format } = payload;
      
      let byteLength = Infinity;
      let buffer: ArrayBuffer | null = null;
      
      if (format === 'image/jpeg') {
        buffer = await encodeJpeg(imageData, { quality: Math.floor(quality * 100) });
        byteLength = buffer.byteLength;
      } else if (format === 'image/webp') {
        buffer = await encodeWebp(imageData, { quality: Math.floor(quality * 100) });
        byteLength = buffer.byteLength;
      } else {
        // PNG optimization isn't easily done from pure ImageData in jsquash without converting to PNG first
        // But if they request PNG we just return infinity for this calculation phase for simplicity,
        // or we handle PNG in main thread.
      }
      
      (self as unknown as Worker).postMessage({ 
        type: 'SUCCESS', 
        payload: { byteLength } 
      });
    }
  } catch (error: any) {
    (self as unknown as Worker).postMessage({ type: 'ERROR', payload: { error: error.message } });
  }
};

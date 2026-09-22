// src/utils/pdfRender.ts

export async function loadPdfJs() {
  if (!(window as any).pdfjsLib) {
    await new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
      script.onload = () => resolve();
      script.onerror = reject;
      document.head.appendChild(script);
    });
    (window as any).pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  }
  return (window as any).pdfjsLib;
}

export async function renderPageToCanvas(
  pdfDoc: any,
  pageNumber: number,
  scale: number = 1
): Promise<{ canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D; viewport: any }> {
  const page = await pdfDoc.getPage(pageNumber);
  const viewport = page.getViewport({ scale });
  
  const canvas = document.createElement('canvas');
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  
  const ctx = canvas.getContext('2d')!;
  await page.render({ canvasContext: ctx, viewport }).promise;
  
  return { canvas, ctx, viewport };
}

export async function getPdfDoc(pdfjsLib: any, pdfData: ArrayBuffer) {
  // Use a copy of the buffer because PDF.js might consume it
  return await pdfjsLib.getDocument({ data: pdfData.slice(0) }).promise;
}

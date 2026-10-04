// src/utils/pdfRender.ts
// Rewritten: uses bundled pdfjs-dist (no CDN), local worker, no unnecessary buffer copies.

let _pdfjsLib: any = null;

/**
 * Returns the singleton pdfjs-dist instance, initialising once with the
 * locally-hosted worker (public/pdfjs/pdf.worker.min.mjs).
 */
export async function loadPdfJs(): Promise<any> {
  if (!_pdfjsLib) {
    const lib = await import('pdfjs-dist');
    // Use the locally hosted worker — never touch an external CDN.
    lib.GlobalWorkerOptions.workerSrc =
      `${((import.meta as any).env.BASE_URL || "/").replace(/\/$/, "")}/pdfjs/pdf.worker.min.mjs`;
    _pdfjsLib = lib;
  }
  return _pdfjsLib;
}

/**
 * Opens a PDF document from an ArrayBuffer.
 * pdfjs-dist v6 does NOT consume the buffer, so we wrap in Uint8Array for
 * safety without making a wasteful full-slice copy.
 */
export async function getPdfDoc(pdfjsLib: any, pdfData: ArrayBuffer): Promise<any> {
  return pdfjsLib.getDocument({ data: new Uint8Array(pdfData) }).promise;
}

/**
 * Renders a single page to a new <canvas> at the requested scale.
 * Caller is responsible for releasing GPU memory when done:
 *   canvas.width = 0; canvas.height = 0;
 */
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

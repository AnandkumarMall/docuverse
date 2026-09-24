import { PDFDocument } from 'pdf-lib';

self.onmessage = async (e: MessageEvent) => {
  try {
    const { type, payload } = e.data;
    
    if (type === 'MERGE_PDFS') {
      const { sourceFiles, pages } = payload as { 
          sourceFiles: Record<string, ArrayBuffer>, 
          pages: { fileId: string, pageIndex: number }[] 
      };
      
      const outPdf = await PDFDocument.create();
      const loadedDocs = new Map<string, PDFDocument>();
      
      let idx = 0;
      const keys = Object.keys(sourceFiles);
      for (const id of keys) {
        self.postMessage({ type: 'PROGRESS', payload: { progress: 20 + (idx / keys.length) * 20, text: 'Loading files in background...' } });
        const buffer = sourceFiles[id];
        loadedDocs.set(id, await PDFDocument.load(buffer));
        idx++;
      }
      
      for (let i = 0; i < pages.length; i++) {
        const p = pages[i];
        const srcDoc = loadedDocs.get(p.fileId);
        if (srcDoc) {
           const [copied] = await outPdf.copyPages(srcDoc, [p.pageIndex]);
           outPdf.addPage(copied);
        }
        
        if (i % 5 === 0) {
            self.postMessage({ 
                type: 'PROGRESS', 
                payload: { progress: 40 + (i / pages.length) * 50, text: `Merging page ${i + 1} of ${pages.length}...` } 
            });
        }
      }
      
      self.postMessage({ type: 'PROGRESS', payload: { progress: 95, text: 'Finalizing PDF...' } });
      const pdfBytes = await outPdf.save();
      
      // We use postMessage directly on self for workers. TS thinks self is Window.
      (self as unknown as Worker).postMessage({ type: 'SUCCESS', payload: { pdfBytes } }, [pdfBytes.buffer]);
    }
  } catch (error: any) {
    (self as unknown as Worker).postMessage({ type: 'ERROR', payload: { error: error.message } });
  }
};

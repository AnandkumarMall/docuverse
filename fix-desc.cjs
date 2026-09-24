const fs = require('fs');

const replacements = [
  {
    file: 'src/pages/image/compress.astro',
    oldDesc: 'Compress images to a specific target file size with a real-time side-by-side quality preview. Perfect for government forms, email, and web. Free, private, instant.',
    newDesc: 'Compress images to a target file size with a side-by-side quality preview. Perfect for government forms, email, and web. Free, private, instant.'
  },
  {
    file: 'src/pages/image/watermark.astro',
    oldDesc: 'Add a custom text watermark to any image online free. Choose font, color, opacity, position, and rotation. Tile watermark across entire image. Download as PNG, JPEG, or WebP. No upload — 100% in your browser.',
    newDesc: 'Add a custom text watermark to any image online free. Choose font, color, opacity, and rotation. Tile across image. Download as PNG, JPEG, or WebP.'
  },
  {
    file: 'src/pages/pdf/editor.astro',
    oldDesc: 'Edit and annotate PDFs online for free. Add text boxes, draw freehand, highlight areas, insert images. Works in your browser — no upload, no signup, 100% private.',
    newDesc: 'Edit and annotate PDFs online for free. Add text boxes, draw freehand, highlight areas, insert images. Works in your browser — no upload, 100% private.'
  },
  {
    file: 'src/pages/pdf/split.astro',
    oldDesc: 'Split a PDF into separate files by page range, visually select pages, or extract all pages individually. Free, private, instant — runs entirely in your browser.',
    newDesc: 'Split a PDF into separate files by page range, visually select pages, or extract individually. Free, private, instant — runs entirely in your browser.'
  },
  {
    file: 'src/pages/pdf/to-image.astro',
    oldDesc: 'Convert PDF pages to high-quality JPG or PNG images. Pages appear live as they render. Choose 300 DPI for print quality. Free, private, instant — runs in your browser.',
    newDesc: 'Convert PDF pages to high-quality JPG or PNG images. Pages appear live as they render. Choose 300 DPI for print quality. Free, private, instant in browser.'
  },
  {
    file: 'src/pages/pdf/watermark.astro',
    oldDesc: 'Add a custom text watermark to any or all pages of your PDF. Live preview. Choose color, opacity, size, position. Free, private, instant — runs entirely in your browser.',
    newDesc: 'Add a custom text watermark to any or all pages of your PDF. Live preview. Choose color, opacity, size, and position. Free, private, instant — runs in browser.'
  },
  {
    file: 'src/pages/tools/excel-to-pdf.astro',
    oldDesc: 'Convert Excel spreadsheets to PDF online free. Supports .xlsx, .xls, and .csv. Live sheet preview, multi-sheet selection, portrait/landscape, A4/Letter. No upload — runs in your browser.',
    newDesc: 'Convert Excel spreadsheets to PDF online free. Supports .xlsx, .xls, .csv. Live sheet preview, multi-sheet selection. No upload — runs in your browser.'
  },
  {
    file: 'src/pages/tools/markdown-to-pdf.astro',
    oldDesc: 'Convert Markdown to PDF online free. Live split-pane editor with instant preview. Choose GitHub, Academic, or Plain themes. A4/Letter, portrait/landscape. No upload — runs in your browser.',
    newDesc: 'Convert Markdown to PDF online free. Live split-pane editor with instant preview. Choose GitHub, Academic, or Plain themes. No upload — runs in your browser.'
  },
  {
    file: 'src/pages/tools/ocr.astro',
    oldDesc: 'Extract text from images and screenshots using OCR. Supports English and Hindi. Download as .txt file. Free, private, runs in your browser — no upload required.',
    newDesc: 'Extract text from images and screenshots using OCR. Supports English and Hindi. Download as .txt file. Free, private — no upload required.'
  }
];

replacements.forEach(({ file, oldDesc, newDesc }) => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(`description="${oldDesc}"`, `description="${newDesc}"`);
  fs.writeFileSync(file, content);
  console.log(`Updated ${file}`);
});

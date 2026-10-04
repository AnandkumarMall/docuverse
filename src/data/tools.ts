import { getAssetPath } from '../utils/paths';

export interface ToolDef {
  name: string;
  href: string;
  desc: string;
  icon: string;
}

export const tools = {
  pdf: [
    { name: "Merge PDF", href: getAssetPath("/pdf/merge"), desc: "Combine multiple PDFs into one document", icon: "merge" },
    { name: "Split PDF", href: getAssetPath("/pdf/split"), desc: "Split a PDF into separate files", icon: "split" },
    { name: "Compress PDF", href: getAssetPath("/pdf/compress"), desc: "Reduce PDF size without quality loss", icon: "compress" },
    { name: "PDF Editor", href: getAssetPath("/pdf/editor"), desc: "Edit text directly inside any PDF", icon: "edit" },
    { name: "PDF to Word", href: getAssetPath("/pdf/to-word"), desc: "Convert PDF to editable Word document", icon: "word" },
    { name: "PDF to Image", href: getAssetPath("/pdf/to-image"), desc: "Export PDF pages as JPG or PNG", icon: "image" },
    { name: "Protect PDF", href: getAssetPath("/pdf/protect"), desc: "Add password protection to your PDF", icon: "lock" },
    { name: "Unlock PDF", href: getAssetPath("/pdf/unlock"), desc: "Remove password from a PDF file", icon: "unlock" },
    { name: "Watermark PDF", href: getAssetPath("/pdf/watermark"), desc: "Stamp custom text on every PDF page", icon: "watermark" },
    { name: "Sign PDF", href: getAssetPath("/pdf/sign"), desc: "Draw, type, or upload your signature", icon: "sign" },
    { name: "Organize PDF", href: getAssetPath("/pdf/organize"), desc: "Rotate, reorder, and delete pages", icon: "organize" },
    { name: "Rotate PDF", href: getAssetPath("/pdf/rotate"), desc: "Rotate all PDF pages 90 or 180 degrees", icon: "rotate" },
    { name: "Crop PDF", href: getAssetPath("/pdf/crop"), desc: "Remove margins and crop PDF pages", icon: "crop" },
    { name: "Page Numbers", href: getAssetPath("/pdf/page-numbers"), desc: "Add page numbers to your PDF document", icon: "number" },
    { name: "Combine PDF", href: getAssetPath("/pdf/combine-pdf"), desc: "Join multiple PDF files into one", icon: "merge" },
    { name: "Reduce PDF Size", href: getAssetPath("/pdf/reduce-pdf-size"), desc: "Shrink PDF file size", icon: "compress" },
    { name: "PDF to JPG", href: getAssetPath("/pdf/to-jpg"), desc: "Convert PDF pages to JPG", icon: "image" },
    { name: "PDF to PNG", href: getAssetPath("/pdf/to-png"), desc: "Convert PDF pages to PNG", icon: "image" },
  ] as ToolDef[],
  image: [
    { name: "Crop Image", href: getAssetPath("/image/crop"), desc: "Crop with presets: 1:1, 16:9, circular", icon: "crop" },
    { name: "Compress Image", href: getAssetPath("/image/compress"), desc: "Shrink file size while keeping quality", icon: "compress" },
    { name: "Resize Image", href: getAssetPath("/image/resize"), desc: "Change width and height precisely", icon: "resize" },
    { name: "Convert Format", href: getAssetPath("/image/convert"), desc: "Switch between JPG, PNG, WebP, AVIF", icon: "convert" },
    { name: "Image to PDF", href: getAssetPath("/image/to-pdf"), desc: "Combine photos into one PDF document", icon: "pdf" },
    { name: "Remove EXIF", href: getAssetPath("/image/remove-exif"), desc: "Strip GPS and metadata from photos", icon: "privacy" },
    { name: "Color Picker", href: getAssetPath("/image/color-picker"), desc: "Click any pixel to copy HEX/RGB/HSL", icon: "color" },
    { name: "Watermark Image", href: getAssetPath("/image/watermark"), desc: "Stamp custom text watermarks on any photo", icon: "img-watermark" },
    { name: "JPG to PDF", href: getAssetPath("/image/jpg-to-pdf"), desc: "Convert JPG to PDF", icon: "pdf" },
    { name: "PNG to PDF", href: getAssetPath("/image/png-to-pdf"), desc: "Convert PNG to PDF", icon: "pdf" },
    { name: "WebP to JPG", href: getAssetPath("/image/webp-to-jpg"), desc: "Convert WebP to JPG", icon: "convert" },
    { name: "PNG to JPG", href: getAssetPath("/image/png-to-jpg"), desc: "Convert PNG to JPG", icon: "convert" },
    { name: "JPG to PNG", href: getAssetPath("/image/jpg-to-png"), desc: "Convert JPG to PNG", icon: "convert" },
    { name: "AVIF to JPG", href: getAssetPath("/image/avif-to-jpg"), desc: "Convert AVIF to JPG", icon: "convert" },
    { name: "Compress JPEG", href: getAssetPath("/image/compress-jpeg"), desc: "Reduce JPEG size", icon: "compress" },
    { name: "Compress PNG", href: getAssetPath("/image/compress-png"), desc: "Reduce PNG size", icon: "compress" },
    { name: "Compress to 20KB", href: getAssetPath("/image/compress-image-to-20kb"), desc: "Shrink image to 20KB", icon: "compress" },
    { name: "Compress to 30KB", href: getAssetPath("/image/compress-image-to-30kb"), desc: "Shrink image to 30KB", icon: "compress" },
    { name: "Compress to 50KB", href: getAssetPath("/image/compress-image-to-50kb"), desc: "Shrink image to 50KB", icon: "compress" },
    { name: "HEIC to JPG", href: getAssetPath("/image/heic-to-jpg"), desc: "Convert iPhone photos", icon: "convert" },
    { name: "SVG to PNG", href: getAssetPath("/image/svg-to-png"), desc: "Convert vector to PNG", icon: "convert" },
    { name: "RAW to JPG", href: getAssetPath("/image/raw-to-jpg"), desc: "Convert RAW camera files", icon: "convert" },
  ] as ToolDef[],
  utilities: [
    { name: "Extract Text (OCR)", href: getAssetPath("/tools/ocr"), desc: "Pull text from images and scanned docs", icon: "ocr" },
    { name: "SVG Optimizer", href: getAssetPath("/tools/svg-optimizer"), desc: "Clean and minify SVG vector files", icon: "svg" },
    { name: "Image to Base64", href: getAssetPath("/tools/image-to-base64"), desc: "Generate Base64 data URIs for CSS/HTML", icon: "code" },
    { name: "Favicon Generator", href: getAssetPath("/tools/favicon-generator"), desc: "Create a complete icon bundle from one image", icon: "favicon" },
    { name: "Markdown to PDF", href: getAssetPath("/tools/markdown-to-pdf"), desc: "Write or upload Markdown and export as PDF", icon: "markdown" },
    { name: "Excel to PDF", href: getAssetPath("/tools/excel-to-pdf"), desc: "Convert spreadsheets to PDF with sheet preview", icon: "excel" },
    { name: "TXT to PDF", href: getAssetPath("/tools/txt-to-pdf"), desc: "Convert plain text files to PDF", icon: "word" },
    { name: "PPT to PDF", href: getAssetPath("/tools/ppt-to-pdf"), desc: "Extract presentation text to PDF", icon: "pdf" },
    { name: "PDF to Markdown", href: getAssetPath("/tools/pdf-to-md"), desc: "Extract PDF text to Markdown", icon: "markdown" },
  ] as ToolDef[],
};

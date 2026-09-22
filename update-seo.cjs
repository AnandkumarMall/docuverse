const fs = require('fs');


const tools = [
  { file: 'src/pages/pdf/merge.astro', data: 'seoDataPdf', key: 'merge', importPath: '../../data/seo-pdf' },
  { file: 'src/pages/pdf/split.astro', data: 'seoDataPdf', key: 'split', importPath: '../../data/seo-pdf' },
  { file: 'src/pages/pdf/compress.astro', data: 'seoDataPdf', key: 'compress', importPath: '../../data/seo-pdf' },
  { file: 'src/pages/pdf/protect.astro', data: 'seoDataPdf', key: 'protect', importPath: '../../data/seo-pdf' },
  { file: 'src/pages/pdf/unlock.astro', data: 'seoDataPdf', key: 'unlock', importPath: '../../data/seo-pdf' },
  { file: 'src/pages/pdf/organize.astro', data: 'seoDataPdf', key: 'organize', importPath: '../../data/seo-pdf' },
  { file: 'src/pages/pdf/watermark.astro', data: 'seoDataPdf', key: 'watermark', importPath: '../../data/seo-pdf' },
  { file: 'src/pages/pdf/sign.astro', data: 'seoDataPdf', key: 'sign', importPath: '../../data/seo-pdf' },
  { file: 'src/pages/pdf/to-image.astro', data: 'seoDataPdf', key: '\'to-image\'', importPath: '../../data/seo-pdf' },
  
  { file: 'src/pages/image/crop.astro', data: 'seoDataImage', key: 'crop', importPath: '../../data/seo-image' },
  { file: 'src/pages/image/compress.astro', data: 'seoDataImage', key: 'compress', importPath: '../../data/seo-image' },
  { file: 'src/pages/image/resize.astro', data: 'seoDataImage', key: 'resize', importPath: '../../data/seo-image' },
  { file: 'src/pages/image/convert.astro', data: 'seoDataImage', key: 'convert', importPath: '../../data/seo-image' },
  { file: 'src/pages/image/to-pdf.astro', data: 'seoDataImage', key: '\'to-pdf\'', importPath: '../../data/seo-image' },
  { file: 'src/pages/image/remove-exif.astro', data: 'seoDataImage', key: '\'remove-exif\'', importPath: '../../data/seo-image' },
  { file: 'src/pages/image/color-picker.astro', data: 'seoDataImage', key: '\'color-picker\'', importPath: '../../data/seo-image' },

  { file: 'src/pages/tools/ocr.astro', data: 'seoDataTools', key: 'ocr', importPath: '../../data/seo-tools' },
  { file: 'src/pages/tools/svg-optimizer.astro', data: 'seoDataTools', key: '\'svg-optimizer\'', importPath: '../../data/seo-tools' },
  { file: 'src/pages/tools/image-to-base64.astro', data: 'seoDataTools', key: '\'image-to-base64\'', importPath: '../../data/seo-tools' },
  { file: 'src/pages/tools/favicon-generator.astro', data: 'seoDataTools', key: '\'favicon-generator\'', importPath: '../../data/seo-tools' },
];

tools.forEach(t => {
  if (!fs.existsSync(t.file)) {
    console.log('Not found:', t.file);
    return;
  }
  let content = fs.readFileSync(t.file, 'utf8');
  
  content = content.replace(/const faqs = \[[\s\S]*?\];\s*---/, '---');
  
  if (!content.includes(t.importPath)) {
    content = content.replace(/import ToolLayout from '.*?';/, match => `${match}\nimport { ${t.data} } from '${t.importPath}';`);
  }
  
  const layoutRegex = /<ToolLayout([\s\S]*?)faqs=\{faqs\}([\s\S]*?)>/;
  
  if (content.match(layoutRegex)) {
    content = content.replace(layoutRegex, `<ToolLayout$1keywords={${t.data}[${t.key}].keywords}\n  faqs={${t.data}[${t.key}].faqs}$2>`);
  } else {
    const endLayoutRegex = /(<ToolLayout[\s\S]*?)(\s*)>/;
    if (!content.includes(`keywords={${t.data}[${t.key}].keywords}`)) {
       content = content.replace(endLayoutRegex, `$1\n  keywords={${t.data}[${t.key}].keywords}\n  faqs={${t.data}[${t.key}].faqs}\n>`);
    }
  }

  fs.writeFileSync(t.file, content);
  console.log('Updated:', t.file);
});

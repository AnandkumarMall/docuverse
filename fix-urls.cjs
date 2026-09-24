const fs = require('fs');
const glob = require('glob');
const files = glob.sync('src/pages/pdf/*.astro');
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/pdf\.js\/\/pdf\.worker\.min\.mjs/g, 'pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs');
  content = content.replace(/pdf\.js\/\/cmaps\//g, 'pdf.js/${pdfjsLib.version}/cmaps/');
  content = content.replace(/pdf\.js\/\/standard_fonts\//g, 'pdf.js/${pdfjsLib.version}/standard_fonts/');
  fs.writeFileSync(file, content);
}
console.log('Fixed properly');

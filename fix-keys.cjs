const fs = require('fs');

const tools = [
  'merge', 'split', 'compress', 'protect', 'unlock', 'organize', 'watermark', 'sign'
];

tools.forEach(key => {
  const file = 'src/pages/pdf/' + key + '.astro';
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  content = content.split('[' + key + ']').join('["' + key + '"]');
  fs.writeFileSync(file, content);
  console.log('Fixed:', file);
});

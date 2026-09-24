const fs = require('fs');
const path = require('path');

function getFiles(dir, files = []) {
  const fileList = fs.readdirSync(dir);
  for (const file of fileList) {
    const name = `${dir}/${file}`;
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files);
    } else {
      if (name.endsWith('.astro')) files.push(name);
    }
  }
  return files;
}

const files = getFiles('src/pages');
let issues = 0;

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  
  const titleMatch = content.match(/title="([^"]+)"/);
  const descMatch = content.match(/description="([^"]+)"/);
  
  if (titleMatch && descMatch) {
    const title = titleMatch[1];
    const desc = descMatch[1];
    
    if (desc.length > 159) {
      console.log(`[Too Long Desc] ${file}: ${desc.length} chars. "${desc}"`);
      issues++;
    }
  } else if (!file.includes('404') && !file.includes('500') && !file.includes('robots') && !file.includes('sitemap') && !file.includes('terms') && !file.includes('privacy')) {
    // Only index.astro, about.astro, contact.astro etc might be missing or using different format
    if (descMatch) {
        if (descMatch[1].length > 159) {
            console.log(`[Too Long Desc] ${file}: ${descMatch[1].length} chars.`);
            issues++;
        }
    }
  }
});

if (issues === 0) console.log('All descriptions under 160 characters.');

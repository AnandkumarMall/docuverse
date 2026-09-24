const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

// Function to find all astro files and extract their toolName and toolTagline
function getTools(dir, tools = []) {
  const fileList = fs.readdirSync(dir);
  for (const file of fileList) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getTools(filePath, tools);
    } else if (filePath.endsWith('.astro')) {
      const content = fs.readFileSync(filePath, 'utf8');
      const nameMatch = content.match(/toolName="([^"]+)"/);
      const taglineMatch = content.match(/toolTagline="([^"]+)"/);
      
      if (nameMatch && taglineMatch) {
        // extract the route path from the file path
        let routePath = filePath.replace('src\\pages\\', '').replace('src/pages/', '').replace('.astro', '');
        routePath = routePath.replace(/\\/g, '/'); // normalize backslashes
        tools.push({
          path: routePath,
          name: nameMatch[1],
          tagline: taglineMatch[1]
        });
      }
    }
  }
  return tools;
}

const generateHTML = (name, tagline) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      margin: 0;
      padding: 0;
      width: 1200px;
      height: 630px;
      background: #141413;
      color: #ffffff;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: 100px;
      position: relative;
    }
    
    .bg-shape {
      position: absolute;
      right: -100px;
      top: -100px;
      width: 600px;
      height: 600px;
      border-radius: 50%;
      background: linear-gradient(135deg, #cf4500 0%, #0075de 100%);
      filter: blur(100px);
      opacity: 0.5;
      z-index: 1;
    }

    .content {
      position: relative;
      z-index: 2;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 40px;
    }

    .logo {
      width: 48px;
      height: 48px;
      background: #cf4500;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .brand-name {
      font-size: 32px;
      font-weight: 700;
      letter-spacing: -0.02em;
    }

    h1 {
      font-size: 84px;
      font-weight: 700;
      letter-spacing: -0.04em;
      margin: 0 0 24px 0;
      line-height: 1.1;
      max-width: 900px;
    }

    p {
      font-size: 36px;
      color: #a0a0a0;
      margin: 0;
      line-height: 1.4;
      max-width: 800px;
      font-weight: 400;
    }

    .pill {
      display: inline-flex;
      background: rgba(255, 255, 255, 0.1);
      padding: 12px 24px;
      border-radius: 999px;
      font-size: 24px;
      font-weight: 600;
      margin-top: 48px;
    }
  </style>
</head>
<body>
  <div class="bg-shape"></div>
  <div class="content">
    <div class="brand">
      <div class="logo">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 8h5.5a4.5 4.5 0 010 9H11v3H8V8zm3 6.5h2.5a1.5 1.5 0 000-3H11v3z" fill="white"/>
        </svg>
      </div>
      <div class="brand-name">DocuVerse</div>
    </div>
    
    <h1>${name}</h1>
    <p>${tagline}</p>

    <div class="pill">100% Free & Private</div>
  </div>
</body>
</html>
`;

async function main() {
  console.log('Finding tools...');
  const tools = getTools('src/pages');
  console.log(`Found ${tools.length} tools. Launching puppeteer...`);

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630 });

  const ogDir = path.join(__dirname, 'public', 'og');
  if (!fs.existsSync(ogDir)) {
    fs.mkdirSync(ogDir, { recursive: true });
  }

  for (const tool of tools) {
    const html = generateHTML(tool.name, tool.tagline);
    await page.setContent(html, { waitUntil: 'load' });
    
    const filename = tool.path.replace(/\//g, '-') + '.png';
    const filepath = path.join(ogDir, filename);
    
    await page.screenshot({ path: filepath });
    console.log(`Generated OG image for: ${tool.name} -> ${filename}`);
  }

  await browser.close();
  console.log('Finished generating OG images!');
}

main().catch(console.error);

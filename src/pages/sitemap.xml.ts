import type { APIRoute } from 'astro';

const SITE = 'https://docuverse.tools';
const today = new Date().toISOString().split('T')[0];

const urls = [
  { loc: '/', priority: '1.0', changefreq: 'weekly' },
  // PDF tools
  { loc: '/pdf/merge',      priority: '0.9', changefreq: 'monthly' },
  { loc: '/pdf/split',      priority: '0.9', changefreq: 'monthly' },
  { loc: '/pdf/compress',   priority: '0.9', changefreq: 'monthly' },
  { loc: '/pdf/protect',    priority: '0.8', changefreq: 'monthly' },
  { loc: '/pdf/unlock',     priority: '0.8', changefreq: 'monthly' },
  { loc: '/pdf/organize',   priority: '0.8', changefreq: 'monthly' },
  { loc: '/pdf/watermark',  priority: '0.8', changefreq: 'monthly' },
  { loc: '/pdf/sign',       priority: '0.8', changefreq: 'monthly' },
  { loc: '/pdf/to-image',   priority: '0.8', changefreq: 'monthly' },
  { loc: '/pdf/to-word',    priority: '0.8', changefreq: 'monthly' },
  // Image tools
  { loc: '/image/crop',          priority: '0.9', changefreq: 'monthly' },
  { loc: '/image/compress',      priority: '0.9', changefreq: 'monthly' },
  { loc: '/image/resize',        priority: '0.9', changefreq: 'monthly' },
  { loc: '/image/convert',       priority: '0.8', changefreq: 'monthly' },
  { loc: '/image/to-pdf',        priority: '0.8', changefreq: 'monthly' },
  { loc: '/image/remove-exif',   priority: '0.8', changefreq: 'monthly' },
  { loc: '/image/color-picker',  priority: '0.8', changefreq: 'monthly' },
  // Smart utilities
  { loc: '/tools/ocr',               priority: '0.8', changefreq: 'monthly' },
  { loc: '/tools/svg-optimizer',     priority: '0.7', changefreq: 'monthly' },
  { loc: '/tools/image-to-base64',   priority: '0.7', changefreq: 'monthly' },
  { loc: '/tools/favicon-generator', priority: '0.7', changefreq: 'monthly' },
  // Legal
  { loc: '/privacy', priority: '0.4', changefreq: 'yearly' },
  { loc: '/terms',   priority: '0.4', changefreq: 'yearly' },
];

export const GET: APIRoute = (context) => {
  const siteUrl = context.site ? context.site.href.replace(/\/$/, '') : 'https://anandkumarmall.github.io/docuverse';
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${siteUrl}${u.loc === '/' ? '' : u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};

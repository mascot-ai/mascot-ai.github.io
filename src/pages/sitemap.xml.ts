import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

// Generated sitemap. Replaces the old hand-written public/sitemap.xml so blog
// posts are included automatically. robots.txt already points here.
const SITE = 'https://mascot-ai.com';
const today = new Date().toISOString().slice(0, 10);

const staticPages: { path: string; lastmod: string }[] = [
  { path: '/', lastmod: today },
  { path: '/features/', lastmod: '2026-08-28' },
  { path: '/pricing/', lastmod: '2026-09-06' },
  { path: '/parents/', lastmod: '2026-09-02' },
  { path: '/about/', lastmod: '2026-08-28' },
  { path: '/blog/', lastmod: today },
  { path: '/coming-soon/', lastmod: '2026-08-28' },
  { path: '/contact/', lastmod: '2026-08-28' },
  { path: '/privacy/', lastmod: '2026-08-28' },
  { path: '/terms/', lastmod: '2026-08-28' },
];

export const GET: APIRoute = async () => {
  const posts = await getCollection('blog', (p) => !p.data.draft);

  const urls = [
    ...staticPages.map((p) => ({ loc: SITE + p.path, lastmod: p.lastmod })),
    ...posts.map((p) => ({
      loc: `${SITE}/blog/${p.slug}/`,
      lastmod: (p.data.updatedDate ?? p.data.pubDate).toISOString().slice(0, 10),
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod></url>`).join('\n')}
</urlset>
`;

  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};

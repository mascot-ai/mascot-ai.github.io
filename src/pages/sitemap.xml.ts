import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { execSync } from 'node:child_process';

// lastmod = date of the last git commit touching the page's source file. Falls back
// to the fallback date below when git history is unavailable (CI needs fetch-depth: 0).
const SOURCE: Record<string, string> = {
  '/': 'src/pages/index.astro',
  '/features/': 'src/pages/features.astro',
  '/pricing/': 'src/pages/pricing.astro',
  '/parents/': 'src/pages/parents.astro',
  '/about/': 'src/pages/about.astro',
  '/editorial-standards/': 'src/pages/editorial-standards.astro',
  '/blog/': 'src/pages/blog/index.astro',
  '/college-list-builder/': 'src/pages/college-list-builder.astro',
  '/college-essay-guide/': 'src/pages/college-essay-guide.astro',
  '/compare/': 'src/pages/compare.astro',
  '/contact/': 'src/pages/contact.astro',
  '/privacy/': 'src/pages/privacy.astro',
  '/terms/': 'src/pages/terms.astro',
};
const gitDate = (file: string, fallback: string) => {
  try {
    const d = execSync(`git log -1 --format=%cs -- ${file}`, { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
    return d || fallback;
  } catch {
    return fallback;
  }
};

// Generated sitemap. Replaces the old hand-written public/sitemap.xml so blog
// posts are included automatically. robots.txt already points here.
const SITE = 'https://mascot-ai.com';

const FALLBACK = '2026-10-17';
const staticPages = Object.entries(SOURCE).map(([path, file]) => ({ path, lastmod: gitDate(file, FALLBACK) }));

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

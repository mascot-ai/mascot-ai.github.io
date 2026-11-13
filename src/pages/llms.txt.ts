import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { BRAND, PRICING, TOTAL_UNIVERSITIES } from '../lib/site.js';

// Generated from the blog collection so new posts appear automatically.
const SITE = 'https://mascot-ai.com';
const one = (s: string) => s.replace(/\s+/g, ' ').trim();

export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog', (p) => !p.data.draft)).sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime(),
  );

  const body = `# ${BRAND}
> Mascot AI is a voice first college coach for high school students that works alongside their counselor. Students talk through their goals, get a ranked college list split into reach, target and safety schools with a reason for each, and get coaching on their own college essays. Mascot does not write essays. Free to start (Explorer plan); Navigator is ${PRICING.navigatorMonthly} per month. Parents can link accounts for read only progress views. Not affiliated with MascotGO.

## Product
- [How it works](${SITE}/features/): voice coaching, school matching across ${TOTAL_UNIVERSITIES} US colleges, essay coaching, application planner
- [Pricing](${SITE}/pricing/)
- [For parents](${SITE}/parents/)
- [For counselors](${SITE}/counselors/)
- [Demo videos](${SITE}/demo/)
- [College list builder](${SITE}/college-list-builder/)
- [Mascot AI vs ChatGPT vs a private counselor](${SITE}/compare/)

## Guides
${posts.map((p) => `- [${one(p.data.title)}](${SITE}/blog/${p.slug}/): ${one(p.data.description)}`).join('\n')}

## About
- [About](${SITE}/about/)
- [Editorial standards](${SITE}/editorial-standards/)
`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};

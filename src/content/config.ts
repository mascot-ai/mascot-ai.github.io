import { defineCollection, z } from 'astro:content';

// Blog posts live in src/content/blog/*.md. `/blog write` (claude-blog skill)
// writes files here; keep the frontmatter matching this schema.
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    pillar: z.enum([
      'essay-topic',
      'college-list',
      'profile',
      'timeline',
      'ai-admissions',
    ]),
    draft: z.boolean().default(false),
    // Optional, ignored by the templates but accepted so `/blog write` output
    // never breaks the build.
    heroImage: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { blog };

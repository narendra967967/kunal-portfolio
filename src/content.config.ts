import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    shortTitle: z.string(),
    /** <title> text, at most 45 characters so the full title with the name suffix stays near 60. */
    seoTitle: z.string().max(45),
    description: z.string().max(160),
    company: z.string(),
    period: z.string(),
    role: z.string(),
    status: z.object({ label: z.string(), tone: z.enum(['ok', 'risk', 'bad', 'p', 'b']) }),
    outcome: z.object({ value: z.string(), label: z.string() }),
    fields: z.array(z.object({ label: z.string(), value: z.string() })),
    snapshot: z.array(z.object({ label: z.string(), value: z.string() })),
    tags: z.array(z.string()),
    filters: z.array(z.enum(['perf', 'arch', 'ai', 'tools'])),
    trail: z.boolean().default(false),
    order: z.number(),
    featured: z.boolean().default(false),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
  }),
});

export const collections = { work };

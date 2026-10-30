import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { caseStudyMd, mdResponse } from '../../lib/markdown';

export const getStaticPaths = (async () => {
  const work = await getCollection('work');
  return work.map((entry) => ({ params: { slug: entry.id }, props: { entry } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props }) => mdResponse(caseStudyMd((props as { entry: CollectionEntry<'work'> }).entry));

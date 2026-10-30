import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { homeMd, aboutMd, resumeMd, caseStudyMd } from '../lib/markdown';

export const GET: APIRoute = async () => {
  const work = (await getCollection('work')).sort((a, b) => a.data.order - b.data.order);
  const body = [homeMd(work), aboutMd(), ...work.map(caseStudyMd), resumeMd()].join('\n\n---\n\n');
  return new Response(body + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};

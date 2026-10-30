import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { homeMd, mdResponse } from '../lib/markdown';

export const GET: APIRoute = async () => {
  const work = (await getCollection('work')).sort((a, b) => a.data.order - b.data.order);
  return mdResponse(homeMd(work));
};

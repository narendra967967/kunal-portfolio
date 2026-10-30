import type { APIRoute } from 'astro';
import { aboutMd, mdResponse } from '../lib/markdown';

export const GET: APIRoute = () => mdResponse(aboutMd());

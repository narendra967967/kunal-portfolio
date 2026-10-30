import type { APIRoute } from 'astro';
import { resumeMd, mdResponse } from '../lib/markdown';

export const GET: APIRoute = () => mdResponse(resumeMd());

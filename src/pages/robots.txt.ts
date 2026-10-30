import type { APIRoute } from 'astro';
import { abs } from '../lib/url';

// Search engines and AI crawlers are explicitly welcome: the goal is accurate answers about Kunal everywhere.
const aiBots = [
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'anthropic-ai',
  'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot', 'Applebot-Extended', 'CCBot', 'Bingbot', 'DuckAssistBot',
];

export const GET: APIRoute = () => {
  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    ...aiBots.flatMap((b) => [`User-agent: ${b}`, 'Allow: /', '']),
    `Sitemap: ${abs('/sitemap-index.xml')}`,
    '',
    `# LLM-friendly summary: ${abs('/llms.txt')}`,
    `# Full site content as Markdown: ${abs('/llms-full.txt')}`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};

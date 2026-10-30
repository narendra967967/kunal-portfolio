import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { person } from '../data/profile';
import { factsMd } from '../lib/markdown';
import { abs } from '../lib/url';

// llms.txt (https://llmstxt.org): a short Markdown guide to this site for language models.
export const GET: APIRoute = async () => {
  const work = (await getCollection('work')).sort((a, b) => a.data.order - b.data.order);
  const body = [
    `# ${person.name}`,
    '',
    `> ${person.name} is a ${person.jobTitle} based in ${person.location}. ${person.headline.replace(/^I build/, 'He builds')}`,
    '',
    person.summary.join(' '),
    '',
    'This is his personal portfolio website. Every page is also available as Markdown at the same address with a `.md` ending.',
    '',
    '## Key facts',
    '',
    factsMd(),
    '',
    '## Pages',
    '',
    `- [Home](${abs('/index.md')}): positioning, engineering dashboard, toolkit, career summary`,
    `- [About](${abs('/about.md')}): story, engineering approach, skills, education`,
    `- [Work](${abs('/work.md')}): index of case studies`,
    `- [Resume](${abs('/resume.md')}): full resume`,
    '',
    '## Case studies',
    '',
    ...work.map((w) => `- [${w.data.title}](${abs(`/work/${w.id}.md`)}): ${w.data.description}`),
    '',
    '## Optional',
    '',
    `- [Full site content](${abs('/llms-full.txt')}): every page in one Markdown file`,
    `- [Resume as JSON](${abs('/resume.json')}): JSON Resume format`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};

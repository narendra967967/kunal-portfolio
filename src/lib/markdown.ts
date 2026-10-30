// Markdown versions of every page, generated from the same data as the HTML.
// Served as page twins (/about.md, /work/<slug>.md ...) and combined into /llms.txt and /llms-full.txt.
import type { CollectionEntry } from 'astro:content';
import {
  person, companies, metrics, metricText, achievements, experience, skills, education, pipeline, topSkills, toolGroups, programs,
} from '../data/profile';
import { abs } from './url';

const lines = (...parts: Array<string | false | undefined>) => parts.filter((p) => p !== false && p !== undefined).join('\n');
const bullets = (items: readonly string[]) => items.map((i) => `- ${i}`).join('\n');

export function factsMd() {
  return lines(
    `- Name: ${person.name}`,
    `- Role: ${person.jobTitle} (currently ${person.currentTitle} at ${person.employer})`,
    `- Experience: ${person.years} years in web engineering`,
    `- Location: ${person.location}`,
    `- Companies: ${companies.join(', ')}`,
    ...metrics.map((m) => `- ${m.label}: ${metricText(m)}`),
    `- Email: ${person.email}`,
    person.linkedin ? `- LinkedIn: ${person.linkedin}` : undefined,
    person.github ? `- GitHub: ${person.github}` : undefined,
  );
}

export function homeMd(work: CollectionEntry<'work'>[]) {
  return lines(
    `# ${person.name}, ${person.jobTitle}`,
    '',
    `> ${person.headline}`,
    '',
    person.summary.join('\n\n'),
    '',
    '## Key facts',
    '',
    factsMd(),
    '',
    '## Program portfolio',
    '',
    programs.map((p) => `- ${p.name} (${p.client}, ${p.scale}): ${p.status}`).join('\n'),
    '',
    '## Selected work',
    '',
    work.map((w) => `- [${w.data.title}](${abs(`/work/${w.id}/`)}): ${w.data.description}`).join('\n'),
    '',
    '## How I engineer',
    '',
    pipeline.map((s) => `${Number(s.n)}. **${s.title}**: ${s.text} (${s.arts.join(', ')})`).join('\n'),
    '',
    '## Tools',
    '',
    toolGroups.map((g) => `- ${g.label}: ${g.tools.map((t) => t[1]).join(', ')}`).join('\n'),
    '',
    `## Top skills\n\n${topSkills.join(', ')}`,
  );
}

export function experienceMd() {
  return experience
    .map((e) => lines(`### ${e.title}, ${e.company}`, e.location ? `${e.period} · ${e.location}` : e.period, '', bullets(e.highlights)))
    .join('\n\n');
}

export function aboutMd() {
  return lines(
    `# About ${person.name}`,
    '',
    person.summary.join('\n\n'),
    '',
    '## How I engineer',
    '',
    pipeline.map((s) => `${Number(s.n)}. **${s.title}**: ${s.text} Uses: ${s.arts.join(', ')}.`).join('\n'),
    '',
    '## Skills',
    '',
    skills.map((s) => `- **${s.group}**: ${s.items.join(', ')}`).join('\n'),
    '',
    '## Education',
    '',
    `- ${education.degree}, ${education.school} (${education.period})`,
  );
}

export function resumeMd() {
  return lines(
    `# ${person.name}`,
    '',
    `${person.jobTitle} · ${person.location} · ${person.email}`,
    person.linkedin ? `LinkedIn: ${person.linkedin}` : undefined,
    person.github ? `GitHub: ${person.github}` : undefined,
    '',
    '## Summary',
    '',
    person.summary.join(' '),
    '',
    '## Achievements',
    '',
    bullets(achievements),
    '',
    '## Experience',
    '',
    experienceMd(),
    '',
    '## Skills',
    '',
    skills.map((s) => `- **${s.group}**: ${s.items.join(', ')}`).join('\n'),
    '',
    '## Education',
    '',
    `- ${education.degree}, ${education.school} (${education.period})`,
  );
}

export function workIndexMd(work: CollectionEntry<'work'>[]) {
  return lines(
    '# Case studies',
    '',
    `Case studies of engineering work by ${person.name}.`,
    '',
    work.map((w) => lines(`## [${w.data.title}](${abs(`/work/${w.id}/`)})`, '', w.data.description, '', `Outcome: ${w.data.outcome.value} ${w.data.outcome.label}`)).join('\n\n'),
  );
}

export function caseStudyMd(w: CollectionEntry<'work'>) {
  return lines(
    `# ${w.data.title}`,
    '',
    `> ${w.data.description}`,
    '',
    w.data.snapshot.map((s) => `- **${s.label}**: ${s.value}`).join('\n'),
    `- **Outcome**: ${w.data.outcome.value} ${w.data.outcome.label}`,
    '',
    (w.body ?? '').trim(),
  );
}

export const mdResponse = (body: string) =>
  new Response(body, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });

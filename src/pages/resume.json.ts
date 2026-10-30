import type { APIRoute } from 'astro';
import { person, experience, skills, education } from '../data/profile';
import { abs } from '../lib/url';

// JSON Resume format (https://jsonresume.org/schema)
export const GET: APIRoute = () => {
  const resume = {
    $schema: 'https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json',
    basics: {
      name: person.name,
      label: person.jobTitle,
      email: person.email,
      url: abs('/'),
      summary: person.summary.join(' '),
      location: { countryCode: person.country },
      profiles: [
        { network: 'LinkedIn', url: person.linkedin },
        { network: 'GitHub', url: person.github },
      ].filter((p) => p.url),
    },
    work: experience.map((e) => ({
      name: e.company,
      position: e.title,
      ...(e.location ? { location: e.location } : {}),
      startDate: e.start,
      ...(e.end ? { endDate: e.end } : {}),
      highlights: [...e.highlights],
    })),
    education: [{ institution: education.school, area: 'Computer Science', studyType: "Bachelor's degree", startDate: '2015', endDate: '2019' }],
    skills: skills.map((s) => ({ name: s.group, keywords: [...s.items] })),
    meta: { canonical: abs('/resume.json') },
  };
  return new Response(JSON.stringify(resume, null, 2), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
};

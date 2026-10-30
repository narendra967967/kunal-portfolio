// JSON-LD builders (schema.org). Kept in one place so every page describes Kunal the same way.
import { person, experience, education } from '../data/profile';
import { abs } from './url';

export const personId = () => `${abs('/')}#person`;
export const websiteId = () => `${abs('/')}#website`;

export function personSchema() {
  return {
    '@type': 'Person',
    '@id': personId(),
    name: person.name,
    givenName: person.givenName,
    familyName: person.familyName,
    jobTitle: person.jobTitle,
    description: person.description,
    email: `mailto:${person.email}`,
    url: abs('/'),
    image: abs('/icon-512.png'),
    address: { '@type': 'PostalAddress', addressCountry: person.country },
    worksFor: { '@type': 'Organization', name: person.employer },
    alumniOf: { '@type': 'CollegeOrUniversity', name: education.school },
    knowsAbout: [...person.knowsAbout],
    sameAs: [person.linkedin, person.github].filter(Boolean),
    hasOccupation: experience.map((e) => ({
      '@type': 'Occupation',
      name: e.title,
      description: `${e.title} at ${e.company} (${e.period})`,
    })),
  };
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': websiteId(),
    url: abs('/'),
    name: `${person.name} · ${person.jobTitle}`,
    inLanguage: 'en',
    author: { '@id': personId() },
  };
}

export function profilePageSchema(path: string, name: string) {
  return {
    '@type': 'ProfilePage',
    '@id': `${abs(path)}#page`,
    url: abs(path),
    name,
    isPartOf: { '@id': websiteId() },
    mainEntity: { '@id': personId() },
    about: { '@id': personId() },
  };
}

export function articleSchema(opts: { path: string; title: string; description: string; published: Date; updated?: Date; tags: string[] }) {
  return {
    '@type': 'Article',
    '@id': `${abs(opts.path)}#article`,
    url: abs(opts.path),
    headline: opts.title,
    description: opts.description,
    datePublished: opts.published.toISOString(),
    dateModified: (opts.updated ?? opts.published).toISOString(),
    author: { '@id': personId() },
    publisher: { '@id': personId() },
    keywords: opts.tags.join(', '),
    isPartOf: { '@id': websiteId() },
  };
}

export function breadcrumbSchema(items: Array<[string, string]>) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(path) })),
  };
}

export function graph(...nodes: object[]) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}

// Single source of truth for every fact on the site.
// Pages, JSON-LD, llms.txt, Markdown twins and resume.json all read from here, so numbers never drift.
// Every fact comes from Kunal's LinkedIn profile.

export type Tone = 'ok' | 'risk' | 'bad' | 'p' | 'b';

export const person = {
  name: 'Kunal Prakash',
  shortName: 'Kunal Prakash',
  givenName: 'Kunal',
  familyName: 'Prakash',
  jobTitle: 'Staff / Lead Software Engineer',
  currentTitle: 'Tech Lead',
  employer: 'HT Digital Streams',
  email: 'kunalprakash.official@gmail.com',
  location: 'India',
  country: 'IN',
  // Left empty until the profile addresses are known; links are hidden while empty.
  linkedin: '' as string,
  github: '' as string,
  years: '7+',
  headline: 'I build high-performance web ecosystems that scale to 20M+ monthly users, without sacrificing velocity or reliability.',
  description:
    'Staff / Lead Software Engineer and Tech Lead at HT Digital Streams (Livemint). Next.js and web performance specialist scaling apps to 20M+ users, with AI-assisted dev workflows and guardrails.',
  summary: [
    'Tech Lead and Systems Architect with 7+ years building for the web, connecting complex engineering challenges with business growth.',
    'At HT Digital Streams (Livemint), I led the migration from VanillaJS to Next.js and architected domain-driven Micro Frontends serving 20M+ monthly active users, speeding up page loads by 20%, improving LCP/INP by up to 35% and cutting bounce rates by 15%.',
    'I build the deterministic guardrails Agentic Workflows need. Intent-based logic audits, performance budget governance and Cursor/Copilot integration boosted engineering sprint velocity by 25%.',
    'I also designed 8+ core npm packages that streamlined internal dev processes and accelerated time-to-market by 30%.',
  ],
  /** The few phrases highlighted (bold, brand colour) wherever the summary is displayed. */
  summaryBold: [
    'Micro Frontends', '20M+ monthly active users', 'LCP/INP by up to 35%', 'sprint velocity by 25%', '8+ core npm packages',
  ],
  knowsAbout: [
    'Next.js', 'React', 'Server-side rendering', 'Micro Frontends', 'System design', 'Core Web Vitals', 'Web performance engineering',
    'GraphQL', 'REST APIs', 'Microservices integration', 'AI-assisted development', 'Agentic workflows', 'Technical mentorship',
  ],
} as const;

export const companies = ['Livemint', 'HT Digital Streams', 'Infosys'] as const;

export const openTo = 'Senior/Staff Engineer, Tech Lead and Architectural roles in product-focused organizations';

export const achievements = [
  'Led the migration of Livemint from VanillaJS to Next.js and architected domain-driven Micro Frontends serving 20M+ monthly active users, with 20% faster page loads, LCP/INP improved by up to 35% and a 15% reduction in bounce rates.',
  'Built deterministic guardrails for Agentic Workflows through intent-based logic audits, performance budget governance and Cursor/Copilot integration, boosting engineering sprint velocity by 25%.',
  'Designed 8+ core npm packages, streamlining internal dev processes and accelerating overall time-to-market by 30%.',
] as const;

export const metrics = [
  { value: 20, suffix: 'M+', prefix: '', label: 'Monthly active users', caption: 'High-traffic media', icon: 'users' },
  { value: 35, suffix: '%', prefix: '', label: 'INP gain', caption: 'Core Web Vitals', icon: 'zap' },
  { value: 30, suffix: '%', prefix: '', label: 'LCP gain', caption: 'Core Web Vitals', icon: 'gauge' },
  { value: 25, suffix: '%', prefix: '', label: 'Sprint velocity boost', caption: 'AI-assisted workflows', icon: 'sparkles' },
  { value: 30, suffix: '%', prefix: '', label: 'Faster time-to-market', caption: 'Developer tooling', icon: 'rocket' },
  { value: 8, suffix: '+', prefix: '', label: 'Core npm packages', caption: 'Internal dev tooling', icon: 'package' },
] as const;

/** A summary paragraph as HTML with the highlighted phrases wrapped in <strong>. */
export const boldSummary = (text: string) =>
  person.summaryBold.reduce((html, phrase) => html.split(phrase).join(`<strong>${phrase}</strong>`), text);

export const metricText =(m: { value: number; prefix: string; suffix: string }) => `${m.prefix}${m.value}${m.suffix}`;

export const toolStrip = [
  ['NX', 'Next.js'], ['RE', 'React'], ['JS', 'JavaScript'], ['GQ', 'GraphQL'], ['RS', 'REST APIs'], ['NP', 'npm'],
  ['GT', 'Git'], ['CU', 'Cursor'], ['CP', 'Copilot'],
] as const;

/** Rows in the dashboard "Program portfolio" table. `filters` drive the filter chips. */
export const programs = [
  { name: 'Livemint: VanillaJS → Next.js', sub: 'End-to-end platform modernization', client: 'Livemint', scale: '20% faster loads', status: 'DELIVERED', tone: 'ok', filters: ['perf', 'arch'], slug: 'livemint-vanillajs-to-nextjs' },
  { name: 'Core Web Vitals optimization', sub: 'Strategic SSR, asset optimization', client: 'High-traffic media platforms', scale: '+30% LCP, +35% INP', status: 'DELIVERED', tone: 'ok', filters: ['perf'], slug: 'core-web-vitals-at-20m-mau' },
  { name: 'Domain-driven Micro Frontends', sub: 'CDN path routing', client: 'HT Digital Streams', scale: '20M+ MAU', status: 'DELIVERED', tone: 'ok', filters: ['arch'] },
  { name: 'AI workflow guardrails', sub: 'Logic audits, performance budgets, Cursor/Copilot', client: 'Engineering teams', scale: '+25% velocity', status: 'DELIVERED', tone: 'ok', filters: ['ai'], slug: 'ai-workflow-guardrails' },
  { name: 'Core npm packages', sub: 'Internal developer tooling', client: 'Engineering teams', scale: '8+ packages', status: 'DELIVERED', tone: 'ok', filters: ['tools'] },
  { name: 'Next.js mobile web interfaces', sub: 'SSR and frontend modernization', client: 'HT Digital Streams', scale: '15% lower bounce', status: 'DELIVERED', tone: 'ok', filters: ['perf'] },
] as const;

export const programFilters = [
  ['all', 'All programs'], ['perf', 'Performance'], ['arch', 'Architecture'], ['ai', 'AI workflows'], ['tools', 'Dev tooling'],
] as const;

/** Measured results shown as bars on the dashboard, largest first. Value is the percentage improvement. */
export const impact = [
  { label: 'INP gain', value: 35 },
  { label: 'LCP gain', value: 30 },
  { label: 'Time-to-market', value: 30 },
  { label: 'Sprint velocity', value: 25 },
  { label: 'Page load speed', value: 20 },
  { label: 'Bounce-rate reduction', value: 15 },
] as const;

/** Recent LinkedIn posts, described in a line each. */
export const writing = [
  { date: 'Aug 5', title: 'Why the security perimeter breaks when AI moves from chat to multi-step agents', topic: 'Agentic AI security' },
  { date: 'Jun 18', title: 'Velocity without discipline turns into compounding tech debt', topic: 'Engineering discipline' },
] as const;

export const experience = [
  {
    years: '2025 – Now', title: 'Tech Lead', company: 'HT Digital Streams', start: '2025-03', end: null, period: 'Mar 2025 – Present', location: 'Remote',
    highlights: [
      'Spearheaded the end-to-end modernization of the Livemint platform from VanillaJS to Next.js, achieving a 20% improvement in page load speeds and a 15% reduction in bounce rates.',
    ],
    short: ['Led the end-to-end modernization of <b>Livemint</b> from <b>VanillaJS to Next.js</b>', 'Delivered <b>20% faster page loads</b> and a <b>15% reduction in bounce rates</b>'],
  },
  {
    years: '2024 – 2025', title: 'SDE-3', company: 'HT Digital Streams', start: '2024-05', end: '2025-03', period: 'May 2024 – Mar 2025', location: 'Remote',
    highlights: [
      'Drove Core Web Vitals optimization for high-traffic media platforms serving 20M+ MAU, achieving a 30% gain in LCP and a 35% gain in INP through strategic SSR and asset optimization.',
    ],
    short: ['Drove <b>Core Web Vitals</b> optimization for media platforms serving <b>20M+ MAU</b>', 'Achieved a <b>30% gain in LCP</b> and a <b>35% gain in INP</b> through strategic SSR and asset optimization'],
  },
  {
    years: '2022 – 2024', title: 'SDE-2', company: 'HT Digital Streams', start: '2022-03', end: '2024-04', period: 'Mar 2022 – Apr 2024', location: 'Remote',
    highlights: [
      'Engineered high-performance Next.js interfaces focused on mobile web optimization, reducing user bounce rates by 15%.',
    ],
    short: ['Engineered high-performance <b>Next.js</b> interfaces focused on mobile web', 'Reduced user bounce rates by <b>15%</b>'],
  },
  {
    years: '2019 – 2022', title: 'Senior System Engineer', company: 'Infosys', start: '2019-10', end: '2022-02', period: 'Oct 2019 – Feb 2022', location: '',
    highlights: [
      'Developed interactive, responsive UI components using React.js and JavaScript for complex enterprise web applications.',
    ],
    short: ['Developed interactive, responsive UI components using <b>React.js and JavaScript</b> for complex enterprise web applications'],
  },
] as const;

export const skills = [
  { group: 'Architecture & frameworks', items: ['Next.js', 'React', 'SSR', 'Micro Frontends (CDN path routing)', 'System design'] },
  { group: 'Web Vitals & performance', items: ['LCP/INP optimization', 'Asset pipeline governance', 'High-traffic handling (elections, budget surges)'] },
  { group: 'APIs & data', items: ['GraphQL', 'REST APIs', 'Microservices integration'] },
  { group: 'Engineering leadership', items: ['AI-assisted dev orchestration', 'Architectural audits', 'Technical mentorship'] },
  { group: 'AI workflows', items: ['Agentic workflow guardrails', 'Intent-based logic audits', 'Performance budget governance', 'Cursor/Copilot integration'] },
  { group: 'Developer tooling', items: ['Core npm packages', 'Internal dev process tooling', 'Git'] },
] as const;

/** Short tab labels for the first four skill groups in the home page toolkit. */
export const competencies = [
  { id: 'arch', label: 'Architecture', group: skills[0] },
  { id: 'perf', label: 'Performance', group: skills[1] },
  { id: 'api', label: 'APIs & data', group: skills[2] },
  { id: 'lead', label: 'Leadership', group: skills[3] },
] as const;

export const toolGroups = [
  { id: 'fw', label: 'Frameworks', color: '#7F6314', tools: [['NX', 'Next.js'], ['RE', 'React'], ['JS', 'JavaScript']] },
  { id: 'arch', label: 'Architecture', color: '#4F5F45', tools: [['MF', 'Micro Frontends'], ['CD', 'CDN path routing'], ['SR', 'SSR']] },
  { id: 'perf', label: 'Performance', color: '#8A5A2B', tools: [['CW', 'Core Web Vitals'], ['LI', 'LCP / INP']] },
  { id: 'api', label: 'APIs & data', color: '#3F3A33', tools: [['GQ', 'GraphQL'], ['RS', 'REST APIs']] },
  { id: 'ai', label: 'AI-assisted development', color: '#6B5A3A', tools: [['CU', 'Cursor'], ['CP', 'Copilot']] },
  { id: 'dev', label: 'Developer tooling', color: '#2A2426', tools: [['GT', 'Git'], ['NP', 'npm']] },
] as const;

export const topSkills = ['System Architecture', 'Next.js', 'Micro Frontends', 'Performance Engineering', 'AI Workflow Orchestration'] as const;
export const moreSkills = ['Core Web Vitals', 'Server Side Rendering (SSR)', 'React.js', 'Engineering Mentorship', 'Git'] as const;

export const pipeline = [
  { n: '01', title: 'Audit', text: 'Start from what the system actually does, with architecture and logic audits.', arts: ['Architectural audits', 'Intent-based logic audits'] },
  { n: '02', title: 'Architect', text: 'Design for scale and split the platform along its domains.', arts: ['System design', 'Micro Frontends', 'CDN path routing'] },
  { n: '03', title: 'Build', text: 'Ship fast, server-rendered interfaces on clean APIs.', arts: ['Next.js', 'SSR', 'GraphQL', 'REST'] },
  { n: '04', title: 'Optimize', text: 'Move the Core Web Vitals that users actually feel, especially on mobile web.', arts: ['LCP / INP', 'Asset optimization'] },
  { n: '05', title: 'Guard', text: 'Keep speed and quality in place as AI writes more of the code.', arts: ['Performance budgets', 'AI guardrails'] },
  { n: '06', title: 'Scale', text: 'Handle traffic surges, share tooling across teams and mentor engineers.', arts: ['Election & budget surges', 'npm packages', 'Mentorship'] },
] as const;

export const education = {
  school: "Galgotia's College of Engineering and Technology, Greater Noida",
  degree: "Bachelor's degree, Computer Science",
  period: '2015 – 2019',
  activities: 'Football, Cricket',
} as const;

export const nav = [
  ['/work/', 'Work'], ['/about/', 'About'], ['/resume/', 'Resume'],
] as const;

/** The resume PDF, served as-is for download. */
export { resumePdfFile as resumePdf } from './resume';

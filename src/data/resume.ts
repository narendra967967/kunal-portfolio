// The web Resume page, built from Kunal's LinkedIn profile, including its bold (<b>) phrases.
// The PDF download (public/Kunal-Prakash-Resume.pdf) is a print of this page.

export const resumePdfFile = '/Kunal-Prakash-Resume.pdf';

export const resume = {
  name: 'Kunal Prakash',
  title: 'Staff / Lead Software Engineer',
  email: 'kunalprakash.official@gmail.com',
  location: 'India',

  summary:
    '<b>Tech Lead and Systems Architect</b> with <b>7+ years</b> building for the web. Next.js and web performance specialist, scaling apps to <b>20M+ users</b>. ' +
    'Focused on <b>micro frontend architecture</b>, <b>web performance engineering (Core Web Vitals)</b> and <b>security-first AI governance</b> across the engineering lifecycle. ' +
    'Open to high-impact <b>Senior/Staff Engineer, Tech Lead and Architectural roles</b> in product-focused organizations.',

  achievements: [
    '<b>Performance engineering at scale:</b> led the Livemint migration from VanillaJS to Next.js and architected domain-driven Micro Frontends serving <b>20M+ monthly active users</b>, with <b>20% faster page loads</b>, LCP/INP improved by <b>up to 35%</b> and a <b>15% reduction in bounce rates</b>.',
    '<b>AI workflow orchestration:</b> built deterministic guardrails for Agentic Workflows through intent-based logic audits, performance budget governance and Cursor/Copilot integration, boosting engineering sprint velocity by <b>25%</b>.',
    '<b>Scalable systems and developer tooling:</b> designed <b>8+ core npm packages</b>, streamlining internal dev processes and accelerating overall time-to-market by <b>30%</b>.',
  ],

  skills: [
    ['Architecture & Frameworks', 'Next.js · React · SSR · Micro Frontends (CDN Path Routing) · System Design'],
    ['Web Vitals & Performance', 'LCP/INP Optimization · Asset Pipeline Governance · High-Traffic Handling (Elections/Budget Surges)'],
    ['APIs & Data', 'GraphQL · REST APIs · Microservices Integration'],
    ['Engineering Leadership', 'AI-Assisted Dev Orchestration · Architectural Audits · Technical Mentorship'],
  ],

  experience: [
    {
      role: 'Tech Lead', org: 'HT Digital Streams', date: 'Mar 2025 – Present', place: 'Remote',
      bullets: [
        '<b>Architectural leadership and migration:</b> spearheaded the end-to-end modernization of the <b>Livemint</b> platform from <b>VanillaJS to Next.js</b>, achieving a <b>20% improvement in page load speeds</b> and a <b>15% reduction in bounce rates</b>.',
      ],
    },
    {
      role: 'SDE-3', org: 'HT Digital Streams', date: 'May 2024 – Mar 2025', place: 'Remote',
      bullets: [
        '<b>High-scale performance:</b> drove <b>Core Web Vitals</b> optimization for high-traffic media platforms serving <b>20M+ MAU</b>, achieving a <b>30% gain in LCP</b> and a <b>35% gain in INP</b> through strategic SSR and asset optimization.',
      ],
    },
    {
      role: 'SDE-2', org: 'HT Digital Streams', date: 'Mar 2022 – Apr 2024', place: 'Remote',
      bullets: [
        '<b>SSR and frontend modernization:</b> engineered high-performance <b>Next.js</b> interfaces focused on mobile web optimization, reducing user bounce rates by <b>15%</b>.',
      ],
    },
    {
      role: 'Senior System Engineer', org: 'Infosys', date: 'Oct 2019 – Feb 2022', place: '',
      bullets: [
        '<b>React and frontend development:</b> developed interactive, responsive UI components using <b>React.js and JavaScript</b> for complex enterprise web applications.',
      ],
    },
  ],

  education: { school: "Galgotia's College of Engineering and Technology, Greater Noida", degree: "Bachelor's degree, Computer Science", period: '2015 – 2019' },
} as const;

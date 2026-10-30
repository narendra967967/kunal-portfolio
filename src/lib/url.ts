// Base-path aware links. The site may live under /portfolio-website/ (GitHub Pages) or at a domain root.
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Site-relative href, e.g. href('/work/') -> '/portfolio-website/work/' */
export function href(path = '/'): string {
  if (/^(https?:|mailto:|#)/.test(path)) return path;
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${BASE}${clean}`;
}

/** Absolute URL for canonical links, sitemaps, JSON-LD and llms.txt. */
export function abs(path = '/'): string {
  const site = (import.meta.env.SITE ?? '').replace(/\/$/, '');
  return `${site}${href(path)}`;
}

/** True when `path` is the current page or a parent section of it. */
export function isActive(current: string, path: string): boolean {
  const c = current.replace(BASE, '') || '/';
  return path === '/' ? c === '/' : c.startsWith(path);
}

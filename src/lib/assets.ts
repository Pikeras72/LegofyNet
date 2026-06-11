/**
 * Resolves a public/ asset path against the configured Vite base.
 * The build uses `base: './'` so the site works on GitHub Pages under any
 * repository name — never hardcode absolute `/images/...` URLs.
 */
export function asset(path: string): string {
  return import.meta.env.BASE_URL + path.replace(/^\/+/, '');
}

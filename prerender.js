import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8');
const { render, PROJECTS } = await import('./dist/server/entry-server.js');

// Slug formula must match Home.jsx and ProjectDetail.jsx exactly
const slugify = (title) =>
  title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

// Define routes to pre-render
const routes = ['/'];
PROJECTS.forEach((project) => {
  routes.push(`/projects/${slugify(project.title)}`);
});

console.log('Pre-rendering routes:', routes);

// Escape special HTML attribute characters
const escapeAttr = (str) =>
  str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

for (const url of routes) {
  const appHtml = render(url);

  // For the home page, prerender the full app HTML for performance.
  // For project pages, leave the root div empty and rely on client-side
  // rendering — the SSR components in ProjectDetail have browser-API
  // dependencies that cause React hydration mismatches. The meta tags
  // injected below are what matters for SEO and social sharing.
  let html =
    url === '/'
      ? template
          .replace(`<!--app-html-->`, appHtml)
          .replace(`<div id="root"></div>`, `<div id="root">${appHtml}</div>`)
      : template;

  // Inject per-project meta tags into prerendered HTML
  if (url.startsWith('/projects/')) {
    const slug = url.replace('/projects/', '');
    const project = PROJECTS.find((p) => slugify(p.title) === slug);

    if (project) {
      const pageTitle = escapeAttr(`${project.title} | Eka Zinich`);
      const pageDesc = escapeAttr(project.desc);
      const pageUrl = `https://ekazinich.com${url}`;
      const pageImage = `https://ekazinich.com/profile.webp`;

      html = html
        .replace(/<title>[^<]*<\/title>/, `<title>${pageTitle}</title>`)
        .replace(/(name="description"\s+content=")[^"]*(")/, `$1${pageDesc}$2`)
        .replace(/(property="og:title"\s+content=")[^"]*(")/, `$1${pageTitle}$2`)
        .replace(/(property="og:description"\s+content=")[^"]*(")/, `$1${pageDesc}$2`)
        .replace(/(property="og:url"\s+content=")[^"]*(")/, `$1${pageUrl}$2`)
        .replace(/(property="og:image"\s+content=")[^"]*(")/, `$1${pageImage}$2`)
        .replace(/(property="twitter:title"\s+content=")[^"]*(")/, `$1${pageTitle}$2`)
        .replace(/(property="twitter:description"\s+content=")[^"]*(")/, `$1${pageDesc}$2`)
        .replace(/(property="twitter:url"\s+content=")[^"]*(")/, `$1${pageUrl}$2`)
        .replace(/(property="twitter:image"\s+content=")[^"]*(")/, `$1${pageImage}$2`);
    }
  }

  // Determine file path
  let filePath = `dist${url === '/' ? '/index.html' : `${url}/index.html`}`;
  filePath = toAbsolute(filePath);

  // Ensure directory exists
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(filePath, html);
  console.log('pre-rendered:', filePath);
}

// Copy index.html to 404.html for GitHub Pages fallback
fs.copyFileSync(toAbsolute('dist/index.html'), toAbsolute('dist/404.html'));
console.log('created: dist/404.html');

// Cleanup: Remove the server bundle as it's not needed for static hosting
fs.rmSync(toAbsolute('dist/server'), { recursive: true, force: true });
console.log('cleaned up: dist/server');

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const toAbsolute = (p) => path.resolve(__dirname, p)

const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8')
const { render, PROJECTS } = await import('./dist/server/entry-server.js')

// Define routes to pre-render
const routes = ['/'];
PROJECTS.forEach(project => {
    const slug = project.title.toLowerCase().replace(/ /g, '-');
    routes.push(`/projects/${slug}`);
});

console.log('Pre-rendering routes:', routes);

for (const url of routes) {
    const appHtml = render(url)

    const html = template.replace(`<!--app-html-->`, appHtml).replace(
        `<div id="root"></div>`,
        `<div id="root">${appHtml}</div>`
    )

    // Determine file path
    let filePath = `dist${url === '/' ? '/index.html' : `${url}/index.html`}`;
    filePath = toAbsolute(filePath);

    // Ensure directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filePath, html)
    console.log('pre-rendered:', filePath)
}

// Copy index.html to 404.html for GitHub Pages fallback
fs.copyFileSync(toAbsolute('dist/index.html'), toAbsolute('dist/404.html'))
console.log('created: dist/404.html')

// Cleanup: Remove the server bundle as it's not needed for static hosting
fs.rmSync(toAbsolute('dist/server'), { recursive: true, force: true })
console.log('cleaned up: dist/server')

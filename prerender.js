import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const toAbsolute = (p) => path.resolve(__dirname, p)

const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8')
const { render } = await import('./dist/server/entry-server.js')

const appHtml = render()

const html = template.replace(`<!--app-html-->`, appHtml).replace(
    `<div id="root"></div>`,
    `<div id="root">${appHtml}</div>`
)

const filePath = toAbsolute('dist/index.html')
fs.writeFileSync(filePath, html)
console.log('pre-rendered:', filePath)

// Cleanup: Remove the server bundle as it's not needed for static hosting
fs.rmSync(toAbsolute('dist/server'), { recursive: true, force: true })
console.log('cleaned up: dist/server')

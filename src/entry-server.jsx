import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import './index.css'

import { StaticRouter } from 'react-router-dom'

export function render(url) {
    return renderToString(
        <StrictMode>
            <StaticRouter location={url}>
                <App />
            </StaticRouter>
        </StrictMode>
    )
}

export { PROJECTS } from './data/projects';

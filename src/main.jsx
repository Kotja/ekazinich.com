import { StrictMode } from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { ShowComponent } from 'show-component'

const rootElement = document.getElementById('root')

const tree = (
  <StrictMode>
    <BrowserRouter>
      <App />
      {import.meta.env.DEV && <ShowComponent sourceRoot={__PROJECT_ROOT__} />}
    </BrowserRouter>
  </StrictMode>
)

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, tree)
} else {
  createRoot(rootElement).render(tree)
}

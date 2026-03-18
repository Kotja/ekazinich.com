import { StrictMode } from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';

const rootElement = document.getElementById('root');

const tree = (
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);

// Only hydrate on the home page — it's the only route with prerendered body
// content. Project pages are generated with an empty root div, so they always
// use createRoot. This also prevents false hydrateRoot calls from SPA
// fallback servers (like vite preview) that serve index.html for all routes.
const isHomeRoute = window.location.pathname === '/';
if (isHomeRoute && rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, tree);
} else {
  createRoot(rootElement).render(tree);
}

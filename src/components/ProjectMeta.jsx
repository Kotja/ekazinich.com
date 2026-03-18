import { useEffect } from 'react';

// Updates the browser tab title on SPA navigation between project pages.
// Crawlable <title>, <meta>, and OG tags are injected at build time by
// prerender.js, so they don't need React rendering here.
const ProjectMeta = ({ project }) => {
  useEffect(() => {
    const prev = document.title;
    document.title = `${project.title} | Eka Zinich`;
    return () => {
      document.title = prev;
    };
  }, [project.title]);

  return null;
};

export default ProjectMeta;

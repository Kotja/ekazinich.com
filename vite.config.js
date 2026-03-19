import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    process.env.ANALYZE &&
      visualizer({
        open: true,
        filename: 'dist/bundle-report.html',
        gzipSize: true,
        brotliSize: true,
      }),
  ].filter(Boolean),
  define: {
    __PROJECT_ROOT__: JSON.stringify(process.cwd()),
  },
});

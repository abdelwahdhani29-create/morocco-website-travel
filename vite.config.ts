import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          city: path.resolve(__dirname, 'city.html'),
          cities: path.resolve(__dirname, 'cities.html'),
          culture: path.resolve(__dirname, 'culture.html'),
          blog: path.resolve(__dirname, 'blog.html'),
          about: path.resolve(__dirname, 'about.html'),
          contact: path.resolve(__dirname, 'contact.html'),
          privacy: path.resolve(__dirname, 'privacy.html'),
          terms: path.resolve(__dirname, 'terms.html'),
          planner: path.resolve(__dirname, 'trip-planner.html'),
          404: path.resolve(__dirname, '404.html'),
        },
        output: {
          manualChunks(id) {
            if (!id.includes('/js/posts/')) return undefined;
            const filename = path.basename(id);
            const planning = ['visa', 'cash', 'cost', 'itinerary', 'best-places'];
            const practical = ['wear', 'safe', 'safety', 'best-time', 'travel-tips'];
            const news = ['world-cup', 'tourism-records', 'fastest-growing', 'casablanca'];
            if (planning.some(key => filename.includes(key))) return 'posts-planning';
            if (practical.some(key => filename.includes(key))) return 'posts-practical';
            if (news.some(key => filename.includes(key))) return 'posts-current';
            return 'posts-destinations';
          },
        },
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

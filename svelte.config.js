import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      fallback: 'index.html' // ensures SPA fallback for Capacitor
    }),
    prerender: {
      entries: ['*'] // ensures all static routes are generated
    }
  }
};

export default config;

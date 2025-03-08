// @ts-check
import { defineConfig, envField } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
  },
  env: {
    schema: {
      R2_BUCKET: envField.string({ context: "client", access: "public", optional: true }),
      R2_URL: envField.string({ context: "client", access: "public", optional: true }),
      R2_ACCESS_KEY: envField.string({ context: "client", access: "public", optional: true }),
      R2_SECRET_KEY: envField.string({ context: "client", access: "public", optional: true }),
    }
  }
});
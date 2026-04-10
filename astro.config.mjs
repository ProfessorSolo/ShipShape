// astro.config.mjs

import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import fs from 'node:fs';
import path from 'node:path';

// Google Analytics
const googleAnalyticsId = 'G-D2FGLZE0C8'; // your GA4 Measurement ID

// Define all course modules here:
const COURSE_MODULES = [
  {
    label: 'DevOps Foundations',
    directory: '01-devops-foundations',
    released: true,
  },
  {
    label: 'Docker Bay Six',
    directory: '02-docker-bay-six',
    released: true,
  },
  {
    label: 'Multi-Container Docker',
    directory: '03-multi-container-docker-compose',
    released: true,
  },
  {
    label: 'Shipping the Stack',
    directory: '04-shipping-the-stack',
    released: true,
  },
  {
    label: 'Over the Horizon',
    directory: '05-over-the-horizon',
    released: true,
  },
];

// SHOW_ALL_CONTENT is TRUE in non-production (local dev / preview).
// It is FALSE (only show released content) during the final production build.
const SHOW_ALL_CONTENT = process.env.NODE_ENV !== 'production';

// Filter based on the flag:
const visibleSidebarModules = COURSE_MODULES
  // Only show the module if it's released OR if we are in dev/preview mode
  .filter((module) => module.released || SHOW_ALL_CONTENT)
  .map((module) => ({
    label: module.label,
    autogenerate: { directory: module.directory },
    collapsed: true,
  }));

function assertNoDraftsInReleased() {
  return {
    name: 'assert-no-drafts-in-released',
    hooks: {
      'astro:build:start': async () => {
        if (process.env.NODE_ENV !== 'production') return;

        const releasedDirs = COURSE_MODULES.filter((m) => m.released).map(
          (m) => m.directory
        );

        for (const dir of releasedDirs) {
          const root = path.join(process.cwd(), 'src', 'content', 'docs', dir);
          if (!fs.existsSync(root)) continue;

          const files = fs.readdirSync(root, { withFileTypes: true });
          for (const f of files) {
            if (!f.isFile()) continue;
            if (!/\.(md|mdx)$/i.test(f.name)) continue;

            const src = fs.readFileSync(path.join(root, f.name), 'utf8');
            if (/^\s*---[\s\S]*?\bdraft:\s*true\b[\s\S]*?---/m.test(src)) {
              throw new Error(
                `Draft found in released module "${dir}": ${f.name}`
              );
            }
          }
        }
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://shipshape.professorsolo.com',
  base: '/',
  output: 'static',
  integrations: [
    starlight({
      title: 'ShipShape DevOps',
      sidebar: visibleSidebarModules,
      favicon: '/favicon.ico',
      head: [
        // Google Analytics
        {
          tag: 'script',
          attrs: {
            async: true,
            src: `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`,
          },
        },
        {
          tag: 'script',
          content: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${googleAnalyticsId}');
          `,
        },
      ],
      customCss: ['./src/styles/global.css'],
    }),
  ],
  vite: {
    plugins: [assertNoDraftsInReleased()],
  },
});

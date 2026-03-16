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
		released: false,
	},
	//   {
	//     label: 'Server Express Way',
	//     directory: '02-server-express-way',
	//     released: true,
	//   },
	//   {
	//     label: 'Revving View Engines - EJS',
	//     directory: '03-rev-up-view-engines-ejs',
	//     released: true,
	//   },
	//   {
	//     label: 'Sleek Templating with Pug',
	//     directory: '04-sleek-templating-with-pug',
	//     released: true,
	//   },
	//   {
	//     label: 'MongoDB Document Vault',
	//     directory: '05-mongodb-document-vault',
	//     released: true,
	//   },
	//   {
	//     label: 'Fast Flexible Mongoose ODM',
	//     directory: '06-fast-flexible-mongoose-odm',
	//     released: true,
	//   },
	//   {
	//     label: 'Mongoose CRUD',
	//     directory: '07-mongoose-crud',
	//     released: true,
	//   },
	//   {
	//     label: 'NoSQL Relationships',
	//     directory: '08-nosql-relationships',
	//     released: true,
	//   },
	//   {
	//     label: 'File Uploads',
	//     directory: '09-file-uploads',
	//     released: true,
	//   },
	//   {
	//     label: 'Authentication with Passport',
	//     directory: '10-auth-with-passport',
	//     released: true,
	//   },
	//   {
	//     label: 'Role Based Authorization',
	//     directory: '11-role-based-authorization',
	//     released: true,
	//   },
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

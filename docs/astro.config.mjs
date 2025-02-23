// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'zmk-keymap-utils',
			social: {
				github: 'https://github.com/magicDGS/zmk-keymap-utils',
			},
			sidebar: [
				{
					label: 'Get started',
					autogenerate: { directory: 'get-started' },
				},
				// TODO: still not good solution to map a directory to a label
				{
					label: 'Features',
					items: [
						{
							label: 'Shortcuts & Modifiers',
							link: '/features/shortcuts-and-modifiers',
						},
						{
							label: 'Select Word',
							link: '/features/select-word',
						},
						{
							label: 'Home Row Mods',
							autogenerate: { directory: 'features/home-row-mods' },
						}
					]
				},
			],
			customCss: [
				'./src/styles/layout.css'
			]
		}),
	],
});

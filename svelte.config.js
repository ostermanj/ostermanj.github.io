import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
console.log(JSON.stringify(import.meta));
/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		alias: {
			$src: 'src/',
			$utils: 'utils',
			$pages: 'src/pages',
			$static: 'static',
			$components: 'src/components'
		},
		browser: {
			router: true,
			hydrate: true
		},
		prerender: {
			default: true
		},
		paths: {
			base: process.env.isGitHub ? '/ostermanj_io' : ''
		}

		/*vite: {
			define: {
				"process.env": process.env
			}
		}*/
	}
};

export default config;

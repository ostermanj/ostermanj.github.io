import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

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
		}
		/*vite: {
			define: {
				"process.env": process.env
			}
		}*/
	}
};

export default config;

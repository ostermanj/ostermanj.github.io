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
			$utils: 'utils',
			$pages: 'src/pages',
			$static: 'static',
		}
		/*vite: {
			define: {
				"process.env": process.env
			}
		}*/
	}
};

export default config;

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
			default: true,
			entries: ['/',
				'/blog/2020/12/29/mapbox/',
				'/blog/2021/09/24/easing-the-pain-with-continuous-deployment/',
				'/project/2021/02/28/netting-billions-2020-global-values-and-trends-for-tuna-fisheries/',
				'/project/2021/03/07/chart-building-web-app/',
				'/blog/2021/01/03/make-mapbox-easier-access-data-dummy-features/',
				'/project/2017/09/05/commitment-to-development-index/',
				'/project/2018/04/04/flood-insurance-map/',
				'/blog/2021/08/12/how-do-you-spell-propagation/',
				'/project/2019/04/11/art-directed-data-story/',
				'/blog/2020/11/01/pennsylvania-retirement/',
				'/project/2017/10/05/housing-insights-project/',
				'/blog/2016/11/30/four-questions-data-visualization/',
				'/blog/2016/11/09/writing-web-embrace-skimming-scanning/',
				'/blog/2020/11/01/pennsylvania-retirement/',
				'/project/2019/12/02/d3-data-dashboard-state-ten-cities/',
				'/project/2019/07/31/broadband-policy-explorer/',
				'/project/2019/08/02/state-debt/',
				]
		},
		paths: {
			base: process.env.IS_GITHUB ? '/ostermanj_io' : ''
		},
		appDir: 'app_',
		trailingSlash: 'ignore'

		/*vite: {
			define: {
				"process.env": process.env
			}
		}*/
	}
};

export default config;

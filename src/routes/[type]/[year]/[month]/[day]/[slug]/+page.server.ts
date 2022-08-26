
import type { ResponseBody } from '@sveltejs/kit';
import type { PageServerLoad } from "../$types";
import { base } from '$app/paths';
const remap = {
  "writing-web-embrace-skimming-scanning": "writing-for-the-web-why-you-should-encourage-skimming-and-scanning",
  "make-mapbox-easier-access-data-dummy-features": "how-i-make-using-mapbox-easier-part-two-accessing-data-with-dummy-features",
  "mapbox": "how-i-make-using-mapbox-easier-part-two-accessing-data-with-dummy-features",
  "four-questions-data-visualization":"four-questions-to-ask-about-your-data-visualization",
  "pennsylvania-retirement":"pennsylvania-retirement-savings-data-viz",
  "d3-data-dashboard-state-ten-cities": "d3js-data-dashboard-the-state-of-10-cities",
  "broadband-policy-explorer":"broadband-policy-explorer-data-tool-to-find-state-laws-about-broadband",
  "art-directed-data-story": "art-directed-data-story-10-trends-in-philly-over-10-years",
  "state-debt":"a-tool-for-better-debt-comparison-data-viz-of-state-debt",
  "flood-insurance-map":"mapping-data-from-the-national-flood-insurance-program"
};
export const load:PageServerLoad<ResponseBody> = async function _GET( {params} ) {
  return {
    redirect: `${base}/content/${remap[params.slug] || params.slug}`
  };
}
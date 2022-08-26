
import type { ResponseBody } from '@sveltejs/kit';
import type { PageServerLoad } from "../$types";
import { redirect } from '@sveltejs/kit';
import { base } from '$app/paths';
const remap = {
  "writing-web-embrace-skimming-scanning": "writing-for-the-web-why-you-should-encourage-skimming-and-scanning"
};
export const load:PageServerLoad<ResponseBody> = async function _GET( {params} ) {
  throw redirect(301, `${base}/content/${remap[params.slug] || params.slug}`);
}
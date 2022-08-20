
import type { ResponseBody } from '@sveltejs/kit';
import type { PageServerLoad } from "../$types";
import { redirect } from '@sveltejs/kit';
export const load:PageServerLoad<ResponseBody> = async function _GET( {params} ) {
  throw redirect(301, `/content/${params.slug}`);
}
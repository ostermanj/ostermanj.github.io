
import type { ResponseBody } from '@sveltejs/kit';
import type { PageServerLoad } from "../$types";
import { getPageContent } from '$utils/contentful';
import { error } from '@sveltejs/kit';
import { base } from '$app/paths';

export const load:PageServerLoad<ResponseBody> = async function _GET({params}) {
    if (params.page == '404.html'){
        return {
            page: '404',
            fields: {
                body: `<p>The page you requested does not exist. Please try again or navigate back to the <a href="${base}/">homepage</a>.`
            }
        }
    }
    try {
        const response = await getPageContent(params.page);
        const fields = response.fields
        return {
            page: params.page,
            fields 
}
    } catch(e){
        const errorMessage = JSON.parse(e.message);
        throw error(errorMessage.status, errorMessage)
    }
  }
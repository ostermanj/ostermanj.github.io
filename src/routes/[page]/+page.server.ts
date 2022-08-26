
import type { ResponseBody } from '@sveltejs/kit';
import type { PageServerLoad } from "../$types";
import { getPageContent } from '$utils/contentful';
import { error } from '@sveltejs/kit';

export const load:PageServerLoad<ResponseBody> = async function _GET({params}) {
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
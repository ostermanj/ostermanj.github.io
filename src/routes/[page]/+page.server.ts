
import type { ResponseBody } from '@sveltejs/kit';
import type { PageServerLoad } from "../$types";
import { getPageContent } from '$utils/contentful';

export const load:PageServerLoad<ResponseBody> = async function _GET({params}) {
    try {
        const response = await getPageContent(params.page);
        const fields = response.fields
        return {
    page: params.page,
    fields 
}
    } catch(error){
        throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292699)");
        return {
            status: 404
        }
    }
  }
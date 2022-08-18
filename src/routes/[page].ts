
import type { ResponseBody } from '@sveltejs/kit';
import type { RequestHandler } from "./__types/[page]";
import { getPageContent } from '$utils/contentful';

export const GET:RequestHandler<ResponseBody> = async function _GET({params}) {
    try {
        const response = await getPageContent(params.page);
        const fields = response.fields
        return {
            body: {
                page: params.page,
                fields 
            }
        }
    } catch(error){
        return {
            status: 404
        }
    }
  }
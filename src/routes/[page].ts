
import type { ResponseBody } from '@sveltejs/kit';
import type { RequestHandler } from "./__types/[page]";
import { getPageContent } from '$utils/contentful';

export const GET:RequestHandler<ResponseBody> = async function _GET({params}) {
    const response = await getPageContent(params.page);
    const fields = response.items[0].fields
    return {
        body: {
            page: params.page,
            fields 
        }
    }
  }
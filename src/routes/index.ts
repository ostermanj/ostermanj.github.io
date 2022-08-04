
import type { ResponseBody } from '@sveltejs/kit';
import type { RequestHandler } from "./__types/[page]";
import { getPageContent } from '$utils/contentful';

export const GET:RequestHandler<ResponseBody> = async function _GET() {
    const response = await getPageContent('homepage');
    const fields = response.fields
    return {
        body: {
            page: 'homepage',
            fields 
        }
    }
  }
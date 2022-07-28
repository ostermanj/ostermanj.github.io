
import type { ResponseBody } from '@sveltejs/kit';
import type { RequestHandler } from "./__types/[slug]";
import { getBlogById } from '$utils/contentful';
import _slugsToIDs from '$utils/bloglist.json' assert {type: 'json'};
const slugsToIDs: Record<string, string> = _slugsToIDs
export const GET:RequestHandler<ResponseBody> = async function _GET( {params} ) {
    const id:string = slugsToIDs[params.slug];
    const response = await getBlogById(id);
    return {
        status: 200,
        body: response.fields
    }
  }
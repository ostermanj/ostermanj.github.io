
import type { ResponseBody } from '@sveltejs/kit';
import type { PageServerLoad } from "../$types";
import { getBlogById } from '$utils/contentful';
import _slugsToIDs from '$utils/bloglist.json' assert {type: 'json'};
const slugsToIDs: Record<string, string> = _slugsToIDs
export const load:PageServerLoad<ResponseBody> = async function _GET( {params} ) {
    
    const id:string = slugsToIDs[params.slug];
    const response = await getBlogById(id);
    response.fields.contentType = response.sys.contentType.sys.id;
    return response.fields
  }
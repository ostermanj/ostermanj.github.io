
import type { ResponseBody } from '@sveltejs/kit';
import type { PageServerLoad } from "../$types";
import { getBlogById } from '$utils/contentful';
import _slugsToIDs from '$utils/bloglist.json' assert {type: 'json'};
import { error } from '@sveltejs/kit';
const slugsToIDs: Record<string, string> = _slugsToIDs;
export const load:PageServerLoad<ResponseBody> = async function _GET( {params} ) {
  const id:string = slugsToIDs[params.slug];
  if ( id === undefined ){
    throw error(404, {statusText: "Not Found"});
  }
  try {
      const response = await getBlogById(id);
      response.fields.contentType = response.sys.contentType.sys.id;
      return response.fields
    }  catch(e){
        const errorMessage = JSON.parse(e.message);
        throw error(errorMessage.status, errorMessage)
    }
  }

import type { RequestHandler } from "./__types/[id]";
import { getBlogById } from '$utils/contentful.js';
import slugsToIDs from '$utils/bloglist.json' assert {type: 'json'};
export const GET:RequestHandler<object> = async function _GET( {params} ) {
    console.log(params);
    const id = slugsToIDs[params.slug];
    console.log(id);
    const response = await getBlogById(id);
    console.log(response);
    return {
        body: response.fields
    }
  }
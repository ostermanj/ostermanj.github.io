
import type { ResponseBody } from '@sveltejs/kit';
import type { RequestHandler } from "./__types/[page]";
import { getPageContent, getEntry } from '$utils/contentful';

export const GET:RequestHandler<ResponseBody> = async function _GET() {
    const response = await getPageContent('homepage');
    const fields = response.fields
    /* try for of loop instead */
    for (  const i in response.fields.featuredWorkExperience ){
        let workPlace = await getEntry(response.fields.featuredWorkExperience[+i].fields.workPlace.sys.id);
        response.fields.featuredWorkExperience[+i].fields.workPlaceName = workPlace.fields.name;
        response.fields.featuredWorkExperience[+i].fields.url = workPlace.fields.url || '/';
    }
    return {
        body: {
            page: 'homepage',
            fields 
        }
    }
  }
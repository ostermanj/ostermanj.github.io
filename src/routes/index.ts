
import type { ResponseBody } from '@sveltejs/kit';
import type { RequestHandler } from "./__types/[page]";
import { getPageContent, getEntry } from '$utils/contentful';

export const GET:RequestHandler<ResponseBody> = async function _GET() {
    const response = await getPageContent('homepage');
    const fields = response.fields
    /* try for of loop instead */
    response.fields.featuredWorkExperience.forEach(async entry => {
        const workPlace = await getEntry(entry.fields.workPlace.sys.id);
        entry.fields.workPlaceName = workPlace.fields.name;
        console.log(entry);
    });
    return {
        body: {
            page: 'homepage',
            fields 
        }
    }
  }
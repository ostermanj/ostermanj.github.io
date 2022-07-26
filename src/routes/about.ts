
import { getPageContent } from '$utils/contentful.js';
export const GET = async function _GET() {
    const response = await getPageContent('about');
    console.log(response);
    return {
        body: response.items[0].fields
    }
  }
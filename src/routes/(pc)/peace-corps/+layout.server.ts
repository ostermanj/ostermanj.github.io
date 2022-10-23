import { getBlogById, getPaginatedCollection } from '$utils/contentful';
import _slugsToIDs from '$utils/bloglist.json' assert {type: 'json'};
import { error } from '@sveltejs/kit';
import { base } from '$app/paths';
const slugsToIDs: Record<string, string> = _slugsToIDs;
export async function load(){
    let fields;
    let posts;
    const id: string = slugsToIDs['peace-corps'];
    if (id === undefined) {
        throw error(404, { statusText: "Not Found" });
    }
    try {
        const response = await getBlogById(id);
        response.fields.contentType = response.sys.contentType.sys.id;
        response.fields.body = response.fields.body.replace(/href="\/(?!\/)/g, `href="${base}/`);
        fields = response.fields;
    } catch (e) {
        const errorMessage = JSON.parse(e.message);
        throw error(errorMessage.status, errorMessage)
    }
    try {
        const response = await getPaginatedCollection('peaceCorpsPost');
        posts =  {
            type: 'peaceCorpsPost',
            items: response.items,
            limit: response.limit,
            total: response.total
        }
    } catch (e) {
        const errorMessage = JSON.parse(e.message);
        throw error(errorMessage.status, errorMessage)
    }
    fields.posts = posts;
    return fields;
}
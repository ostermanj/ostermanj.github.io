import { getPaginatedCollection } from "$utils/contentful";
import { error } from '@sveltejs/kit';

export async function load({params}){
    try {
        const response = await getPaginatedCollection(params.type);
        return {
            type: params.type,
            items: response.items,
            limit: response.limit,
            total: response.total
        }
    } catch(e){
        const errorMessage = JSON.parse(e.message);
        throw error(errorMessage.status, errorMessage)
    }
}
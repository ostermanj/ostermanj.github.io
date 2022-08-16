import { getPaginatedCollection } from "$utils/contentful";

export async function GET({params}){
    const response = await getPaginatedCollection(params.type);
    return {
        body: {
            type: params.type,
            items: response.items,
            limit: response.limit,
            total: response.total
        }
    }
}
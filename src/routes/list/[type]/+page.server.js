import { getPaginatedCollection } from "$utils/contentful";

export async function load({params}){
    const response = await getPaginatedCollection(params.type);
    return {
    type: params.type,
    items: response.items,
    limit: response.limit,
    total: response.total
}
}
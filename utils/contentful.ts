import type { JSONValue } from '@sveltejs/kit/types/private';
import contentful, { type Entry, type EntryCollection } from 'contentful';
const client = contentful.createClient({
    space: tS(process.env.C_SPACE),
    //environment: 'master',
    accessToken: tS(process.env.C_TOKEN)
});
function tS(value: string | undefined){
    if ( typeof value == 'string') return value;
    return '';
}
export function getBlogById(id:string){
    // below asserts that return is not Promise<Entry<unknow>> but ... 
    return client.getEntry(id) as Promise<Entry<JSONValue>>;
}
export function getPageContent(page: string){
    console.log(page);
    return client.getEntries({
        content_type: page
    }) as Promise<EntryCollection<JSONValue>>;
}

export function getAsset(id:string){
    return client.getAsset(id);
}
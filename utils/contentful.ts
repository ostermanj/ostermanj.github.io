import type { JSONValue } from '@sveltejs/kit/types/private';
import contentful, { type Entry, type EntryCollection } from 'contentful';
import { markdown } from 'markdown';
const client = contentful.createClient({
    space: tS(process.env.C_SPACE),
    //environment: 'master',
    accessToken: tS(process.env.C_TOKEN)
});
function tS(value: string | undefined){
    if ( typeof value == 'string') return value;
    return '';
}
async function toHTML(md:string){
    let htmlTree = markdown.toHTMLTree(md);
    htmlTree = await sourceSetify(htmlTree);
    return markdown.renderJsonML(htmlTree);
}
function sourceSetify(htmlTree: []): Promise<[]> {
    return new Promise(function(resolve){
        const branchPromises = [];
        async function findImageTag(branch){
            if ( branch[0] == 'img' ){
                branch[0] = 'picture';
                const attributes = Object.assign({}, branch[1]);
                const imgID = attributes.src.split('/')[4];
                const imageData = await getAsset(imgID);
                attributes.width = `${imageData.fields.file.details.image?.width}px`;
                attributes.height = `${imageData.fields.file.details.image?.height}px`;
                branch.splice(1)
                branch.push(...['avif', 'webp'].map(format => {
                    return ['source', {srcset: attributes.src + `?fm=${format}`, type: `image/${format}`}]
                }));
                branch.push(['img', attributes]);
                return branch;
            } else if ( Array.isArray(branch[1]) ){
                return findImageTag(branch[1]);
            } else {
                return branch;
            }
        }
        htmlTree = htmlTree.splice(1);
        htmlTree.forEach(branch => {
            branchPromises.push(findImageTag(branch));
        });
        Promise.all(branchPromises).then(() => {
            resolve(htmlTree);
        });
    });

}
export async function getBlogById(id:string){
    // below asserts that return is not Promise<Entry<unknow>> but ... 
    const response = await client.getEntry(id) as Entry<JSONValue>;
    response.fields.body = await toHTML(response.fields.body);
    console.log(response.fields.body);
    return response;
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
import type { JSONValue } from '@sveltejs/kit/types/private';
import contentful, { type Entry, type EntryCollection } from 'contentful';
import MarkdownIt from 'markdown-it';
const markdown = MarkdownIt({
    html: true,
    typographer: true
});
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
    return sourceSetify(markdown.render(md));
}
async function replaceAsync(str, regex, asyncFn) {
    const promises = [];
    str.replace(regex, (match, ...args) => {
        const promise = asyncFn(match, ...args);
        promises.push(promise);
    });
    const data = await Promise.all(promises);
    return str.replace(regex, () => data.shift());
}
async function addContentifyInfo(match, ...args){
    const imgID = args[0].split('/')[4];
    const imageData = await getAsset(imgID);
    const width = imageData.fields.file.details.image?.width;
    const height = imageData.fields.file.details.image?.height;
    const hToW = height / width;
    const sourceSets = ['avif','webp'].reduce(function(acc, cur){
        return acc + `<source srcset="${args[0]}?fm=${cur}&w=1480&h=${Math.round(hToW * 1480)}&q=30 2x, ${args[0]}?fm=${cur}&w=740&h=${Math.round(hToW * 740)}&q=30 1x" type="image/${cur}" media="(min-width:632px)">
                      <source srcset="${args[0]}?fm=${cur}&w=800&h=${Math.round(hToW * 800)}&q=30 2x, ${args[0]}?fm=${cur}&w=400&h=${Math.round(hToW * 400)}&q=30 1x" type="image/${cur}">`;
    },'');
    return `<picture>${sourceSets}<img src="${args[0]}${args[1]} width="${width}px" height="${height}px" /></picture>`;
}
async function sourceSetify(html){
    const regex = /<img src="(.*?)"(.*?)>/g;
    return replaceAsync(html, regex, addContentifyInfo);
}
export async function getPaginatedCollection(content_type = "blogPost", skip = 0, limit = 100){
    return await client.getEntries({
        content_type,
        skip,
        limit,
        order: '-fields.datePublished'
    })
}
export async function getEntry(id:string){
    return await client.getEntry(id) as Entry<JSONValue>;
}
export async function getBlogById(id:string){
    // below asserts that return is not Promise<Entry<unknow>> but ... 
    debugger;
    const response = await client.getEntry(id) as Entry<JSONValue>;
    response.fields.body = await toHTML(response.fields.body);
    response.fields.body = response.fields.body.replace(/^<p>(\w)/,'<p><span class="first-letter">$1</span>');
    return response;
}
export async function getPageContent(page: string){
    const response = await client.getEntries({
        content_type: page
    }) as EntryCollection<JSONValue>;
    response.items[0].fields.body = await toHTML(response.items[0].fields.body);
    return response.items[0];
}

export function getAsset(id:string){
    return client.getAsset(id);
}
import type { JSONValue } from '@sveltejs/kit/types/private';
import contentful, { type Entry, type EntryCollection } from 'contentful';
import MarkdownIt from 'markdown-it';
const markdown = MarkdownIt({
    html: true,
    typographer: true
});
let client;
export function initContentful(C_SPACE, C_TOKEN){
    client = contentful.createClient({
        space: C_SPACE,
        //environment: 'master',
        accessToken: C_TOKEN
    });
}
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
function escapeQuotes(str){
    if (!str){
        return '';
    }
    str = str.replace(/"/g, "'");
    return str;
}

async function addContentifyInfo(match, ...args){

    const sizeFactor = args[1].indexOf('#half') !== -1 ? 0.5 : args[1].indexOf('#two-thirds') !== -1 ? 0.667 : 1;
    const imgID = args[0].split('/')[4];
    const imageData = await getAsset(imgID);
    const width = imageData.fields.file.details.image?.width;
    const height = imageData.fields.file.details.image?.height;
    const desc = escapeQuotes(imageData.fields.description);
    const hToW = height / width;
    const sourceSets = ['avif','webp'].reduce(function(acc, cur){
        if (sizeFactor == 1){
            return acc + `<source srcset="${args[0]}?fm=${cur}&w=${1480}&h=${Math.round(hToW * 1480)}&q=30 2x, ${args[0]}?fm=${cur}&w=${740}&h=${Math.round(hToW * 740)}&q=30 1x" type="image/${cur}" media="(min-width:632px)">
                          <source srcset="${args[0]}?fm=${cur}&w=${800}&h=${Math.round(hToW * 800)}&q=30 2x, ${args[0]}?fm=${cur}&w=${400}&h=${Math.round(hToW * 400)}&q=30 1x" type="image/${cur}">`;
        } else if (sizeFactor == 0.667){
            return acc + `<source srcset="${args[0]}?fm=${cur}&w=${988}&h=${Math.round(hToW * 988)}&q=30 2x, ${args[0]}?fm=${cur}&w=${494}&h=${Math.round(hToW * 494)}&q=30 1x" type="image/${cur}">`;
        } else {
            return acc + `<source srcset="${args[0]}?fm=${cur}&w=${680}&h=${Math.round(hToW * 680)}&q=30 2x, ${args[0]}?fm=${cur}&w=${340}&h=${Math.round(hToW * 340)}&q=30 1x" type="image/${cur}">`;
        }
    },'');
    return `<picture>
        ${sourceSets}
        <img load="lazy" class="${sizeFactor == 0.5 ? 'half' : sizeFactor == 0.667 ? 'two-thirds' : 'full'}" src="${args[0]}" width="${width}px" height="${height}px" alt="${desc}" />
    </picture>`;
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
    
    const response = await client.getEntry(id) as Entry<JSONValue>;
    response.fields.body = await toHTML(response.fields.body);
    response.fields.body = response.fields.body.replace(/^<p>(\w)/,'<p><span class="first-letter">$1</span>');
    response.fields.body = response.fields.body.replace(/<p><picture>/g,'<picture>');
    response.fields.body = response.fields.body.replace(/<\/picture><\/p>/g,'</picture>');
    return response;
}
export async function getPageContent(page: string){
    const response = await client.getEntries({
        content_type: page
    }) as EntryCollection<JSONValue>;
    response.items[0].fields.body = await toHTML(response.items[0].fields.body);
    response.items[0].fields.body = response.items[0].fields.body.replace(/^<p>(\w)/,'<p><span class="first-letter">$1</span>');
    return response.items[0];
}

export function getAsset(id:string){
    return client.getAsset(id);
}
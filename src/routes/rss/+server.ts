
import type { RequestHandler } from "./$types";
import { getPageContent } from '$utils/contentful';
import allEntries from '$src/allEntries.json' assert {type: 'json'};
export const prerender = false;
function categoriesToXML(categories){
    if (!categories){
        return '';
    }
    return categories.reduce(function(acc,cur){
        acc = acc + `
        <category>${cur}</category>`;
        return acc;
    },'');
}
function entryToXML(entry){
    return `
    <item>
        <title>${entry.title}</title>
        <description><![CDATA[${entry.description} ]]></description>
        <pubDate>${entry.datePublished}</pubDate>
        <updated>${entry.dateUpdated}</updated>
        ${categoriesToXML(entry.categories)}
        <link>${entry.link}</link>
        <guid isPermaLink="true">${entry.link}</guid>
    </item>`;
}
export const GET: RequestHandler = async function GET({url}){
    const homepage = await getPageContent('homepage');
    const tagline = homepage.fields.overview;
    const code = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
        <channel>
            <atom:link href="http://osterman.blog/rss" rel="self" type="application/rss+xml" />
            <title>John Osterman</title>
            <link>https://osterman.blog</link>
            <description>${tagline}</description>
            <pubDate>Fri, 01 Jan 2016 00:00:00 +0000</pubDate>
            <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
            ${allEntries.map(entryToXML).join('')}
        </channel>
    </rss>`;
    const headers = {
        'Cache-Control': `max-age=0`,
        'Content-Type': 'application/xml',
    };
    return new Response(code, { status: 200, statusText: 'ok', headers});
}
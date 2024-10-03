import contentful from 'contentful';
import slugify from 'slugify';
import fs from 'fs';
import path from 'path';
import url from 'url';
const allEntries = [];
const entrySlugsToId = {};
const client = contentful.createClient({
    space: process.env.C_SPACE,
    //environment: 'master',
    accessToken: process.env.C_TOKEN
});
async function getPaginatedCollection({content_type = "blogPost", skip = 0, limit = 100, base = ''}){
    return client.getEntries({
        content_type,
        skip,
        limit,
        order: ['page','poem'].includes(content_type) ? 'sys.createdAt' : '-fields.datePublished'
    }).then(response => {
        // need to either change the fields in Poem to match or set up another fn to handle
        response.items.forEach(blog => {
            mapSlugToId(blog);
            const fields = content_type !== 'page' ? {
                title: blog.fields.title,
                datePublished: blog.fields.datePublished ? new Date(blog.fields.datePublished).toUTCString() : undefined,
                dateUpdated: blog.fields.dateUpdated || blog.fields.datePublished ? new Date(blog.fields.dateUpdated || blog.fields.datePublished).toUTCString() : undefined,
                description: (blog.fields.snippet ?? '' )+ `<p><a href="${base}/${content_type == 'blogPost' || content_type == 'project' ? 'content' : 'peace-corps'}/${slugify(blog.fields.title, {strict: true, lower: true})}">Read more</a></p>`,
                link: `${base}/${content_type == 'blogPost' || content_type == 'project' ? 'content' : 'peace-corps'}/${slugify(blog.fields.title, {strict: true, lower: true})}`,
                
            } : {
                    title: blog.fields.title || blog.fields.seriestitle,
                    link: `${base}/${slugify((blog.fields.title || blog.fields.seriesTitle), {strict: true, lower: true})}`,
            };
            if (content_type == 'blogPost'){
                fields.author = blog.fields.authors.map(author => author.fields.fullName).join(', ');
                fields.categories = blog.fields.tags.map(tag => tag.fields.tag);
            }
            if ( content_type !== 'page'){
                allEntries.push(fields);
            }
        })
        if ( response.total > skip + response.limit ){
            return getPaginatedCollection({content_type, skip: skip + response.limit, limit, base})
        }
    }).catch(console.error);
}
function reverse(obj){
    const newObj = {};
    Object.keys(obj).forEach(key => {
        newObj[obj[key]] = key;
    });
    return newObj;
}
function mapSlugToId(blog, attempt = 0){
    const slug = slugify((blog.fields.title || blog.fields.seriesTitle), {strict: true, lower: true});
    if (entrySlugsToId[attempt > 0 ? `${slug}-${attempt}` : attempt] === undefined){
        entrySlugsToId[slug + (attempt > 0 ? `-${attempt}` : '')] = blog.sys.id;
    } else {
        mapSlugToId(blog, ++attempt)
    }
}
function writeToFile(){
    fs.writeFileSync(path.join(path.dirname(url.fileURLToPath(import.meta.url)), '/../utils/bloglist.json'), JSON.stringify(entrySlugsToId, null, 2));
    fs.writeFileSync(path.join(path.dirname(url.fileURLToPath(import.meta.url)), '/../src/idlist.json'), JSON.stringify(reverse(entrySlugsToId), null, 2));
    fs.writeFileSync(path.join(path.dirname(url.fileURLToPath(import.meta.url)), '/../src/allEntries.json'), JSON.stringify(allEntries, null, 2));
}
Promise.all([
    getPaginatedCollection({}),
    getPaginatedCollection({ content_type: 'project' }),
    getPaginatedCollection({ content_type: 'page' }),
    getPaginatedCollection({ content_type: 'peaceCorpsPost' }),
    getPaginatedCollection({ content_type: 'poem' })
]).then(() => {
     writeToFile();
     process.exit(0);
});
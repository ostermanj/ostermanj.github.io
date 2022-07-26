import contentful from 'contentful';
import slugify from 'slugify';
import fs from 'fs';
import path from 'path';
import url from 'url';

const blogSlugsToId = {};
const client = contentful.createClient({
    space: process.env.C_SPACE,
    //environment: 'master',
    accessToken: process.env.C_TOKEN
});
function getPaginatedCollection(skip = 0){
    client.getEntries({
        content_type: 'blogPost',
        skip
    }).then(response => {
        response.items.forEach(blog => {
            mapSlugToId(blog);
        })
        if ( response.total > skip + response.limit ){
            getPaginatedCollection(skip + response.limit)
        } else {
            writeToFile();
        }
    }).catch(console.error);
}
function mapSlugToId(blog, attempt = 0){
    const slug = slugify(blog.fields.title, {strict: true, lower: true});
    if (blogSlugsToId[slug] === undefined){
        blogSlugsToId[slug + (attempt > 0 ? `-${attempt}` : '')] = blog.sys.id;
    } else {
        mapSlugToId(blog, ++attempt)
    }
}
function writeToFile(){
    fs.writeFileSync(path.join(path.dirname(url.fileURLToPath(import.meta.url)), '/../utils/bloglist.json'), JSON.stringify(blogSlugsToId, null, 2));
}
getPaginatedCollection();
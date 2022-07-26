import contentful from 'contentful';

const client = contentful.createClient({
    space: process.env.C_SPACE,
    //environment: 'master',
    accessToken: process.env.C_TOKEN
});

export function getBlogById(id){
    return client.getEntry(id);
}
export function getPageContent(page){
    console.log(page);
    return client.getEntries({
        content_type: page
    });
}
<script context="module">
    import Tags from '$components/Tags.svelte';
    import Authors from '$components/Authors.svelte';
    import { getAsset } from '$utils/contentful';
    import { markdown } from 'markdown';
</script>
<script lang="ts">
    export let title: string;
    export let body: string;
    export let tags:[];
    export let datePublished: string;
    export let authors:[];
    let htmlTree = markdown.toHTMLTree(body);
    sourceSetify(htmlTree);
    console.log(htmlTree);
    let bodyHTML = markdown.renderJsonML(htmlTree);
    // TO DO: SHOULD PRPBABLY DO THIS IN THE PAGE ENDPOINT INSTEAD. RETURN HTML, NOT MARKDOWN
    /**
     * 
     * @param htmlTree string
     * 
     * the body of the blogpost is in markdown. it may contain images that would render
     * as stright up <img> tags. better to render them instead as <picture>s with <sources>
     * to make use of next generation image formats, avif, webp, that the contentful CMS
     * makes easily available
     */
    function sourceSetify(htmlTree: []): void {
        async function findImageTag(branch){
            var hasBeenModified = false;
            if ( branch[0] == 'img' ){
                branch[0] = 'picture';
                let attributes = Object.assign({}, branch[1]);
                let imgID = attributes.src.split('/')[4];
                let imageData = await getAsset(imgID);
                console.log(imageData);
                branch.splice(1)
                branch.push(...['avif', 'webp'].map(format => {
                    return ['source', {srcset: attributes.src + `?fm=${format}`, type: `image/${format}`}]
                }));
                branch.push(['img', attributes]);
                hasBeenModified = true;
            } else if ( Array.isArray(branch[1]) && !hasBeenModified){
                findImageTag(branch[1])
            }
        }
        htmlTree.forEach(findImageTag)
    }
</script>
<article>
    <header>
        <h1>{title}</h1>
        <Tags {tags} />
        <Authors {authors} />
        <p>Published <time datetime={datePublished}>{new Date(datePublished).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time></p>
    </header>
    {@html bodyHTML}
</article>

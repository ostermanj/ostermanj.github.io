<script context="module">
    import idsToSlugs from '$src/idlist.json';
    import PostThumb from '$components/PostThumb.svelte';
    import PostThumbLarge from '$components/PostThumbLarge.svelte';
    import { base } from '$app/paths';
</script>
<script>
    export let contents;
    export let style = 'large';
    export let parent = '';
    let contentTypes = {
      blogPost: 'Blog post',
      project: 'Project',
      peaceCorpsPost: 'Blog post',
    };
</script>
<style type="scss">
   .container {
      display: grid;
      grid-template-columns: 1fr;
      gap: 5cqw;
      @media screen and (min-width:571px) {
        grid-template-columns: 1fr 1fr;
      }
    }
    .small.container {
      grid-template-columns: 1fr;
    }
    article {
      padding: 4px;
      border-radius: 2px;
    }
    article:nth-of-type(4n + 1){
      background: linear-gradient(to top right, var(--color-primary-1-bright), var(--color-primary-1-dark), var(--color-primary-1-bright));
      border-radius: 20px 20px 0 0;
      @media screen and (min-width:571px) {
        border-radius: 20px 0 0 0;
      }
    }
    article:nth-of-type(4n + 2){
      background: linear-gradient(to top left, var(--color-primary-1-bright), var(--color-primary-1-dark), var(--color-primary-1-bright));
      @media screen and (min-width:571px) {
        border-radius: 0 20px 0 0;
      }
    }
    article:nth-of-type(4n + 3){
      background: linear-gradient(to top left, var(--color-primary-1-bright), var(--color-primary-1-dark), var(--color-primary-1-bright));
      @media screen and (min-width:571px) {
        border-radius: 0 0 0 20px;
      }
    }
    article:nth-of-type(4n + 4){
      background: linear-gradient(to top right, var(--color-primary-1-bright), var(--color-primary-1-dark), var(--color-primary-1-bright));
      border-radius: 0 0 20px 20px;
      @media screen and (min-width:571px) {
        border-radius: 0 0 20px 0;
      }
  }
  .article-inner {
    row-gap: 10px;
    column-gap: 20px;
    align-items: stretch;
    background-color: var(--color-background-2);
    transition: background-color 0.15s ease-in-out;
    border-radius: 16.5px;
  }
  .small.container article {
    padding: 0;
    border-width: 0;
    background-color: transparent;
    border-radius: 0;
    .article-inner {
      border-radius: 0;
    }
    
  }
  .small.container .article-inner {
    background-color: var(--color-background-1);
  }
  a:hover .article-inner, a:focus .article-inner {
    background-color: var(--color-background-1);
  }
  article p {
    margin-block: 0.5em 0;
    line-height: 1.6;
    display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;  
  overflow: hidden;
  }
  h1 {
      margin-block: 0;
      line-height: 1;
  }
  .content-type {
    font-family: var(--font-family-sans-2);
    margin: -0.5em 0 0;
    text-transform: uppercase;
    font-size: 0.85rem;
  }
  .card-text p:not(.date){
    hyphens: auto;
  }
  .small .card-text {
    flex: 30 1 370px;
    padding-inline-start: 0;
  }
  .small .card-text p {
    hyphens: none;
  }
  .small .card-text {
    padding-block: 0;
  }
  .small .date {
    color: #767676;
    margin-block-start: 0;
    /* font-size: 0.85rem; */
    /* font-weight: bold; */
    font-family: var(--font-family-sans);
  }
  h1 {
    color: var(--color-primary-1);
    transition: color 0.15s ease-in-out;
  }
  a {
    text-decoration: none;
    border-bottom-width: 0;
    color: inherit;
    align-self: stretch;
    display: flex;

  }
  a:hover h1, a:focus h1 {
    color: var(--color-primary-1-dark);
    text-decoration: underline;
  }
</style>
<div class:small="{style == 'small'}" class="container g2 {parent}">
    {#each contents as content}
    {@const contentType = contentTypes[content.sys.contentType.sys.id]}
    <article class="fx">
      <a href="{base}/{parent == 'peace-corps' ? 'peace-corps' : 'content'}/{idsToSlugs[content.sys.id]}">
        <div  class="article-inner fx" class:fd-c="{style == 'large'}">
          {#if content.fields.heroImage}
            {#if style == 'small'}
          <PostThumb file="{content.fields.heroImage.fields.file}" />
          {:else}
          <PostThumbLarge file="{content.fields.heroImage.fields.file}" />
          {/if}
          {/if}
            <div class="p1 fx fd-c card-text">
              <header>
              {#if style == 'large'}
              <p class="content-type">{contentType}</p>
              {/if}
                  <h1 class="not-h1 h2">{content.fields.title}</h1>
                </header>
                <main>
                  <p class="ts-s">{content.fields.snippet}</p>
                  {#if style == 'small'}
                  <p class="ts-s date"><span class="vsh">Published</span> <time datetime={content.fields.datePublished}>{new Date(  content.fields.datePublished  ).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}</time></p>
                  {/if}
              </div>
        </div>
        </a>
      </article>
    {/each}
</div>
<script context="module">
    import idsToSlugs from '$src/idlist.json';
    import PostThumb from '$components/PostThumb.svelte';
    import PostThumbLarge from '$components/PostThumbLarge.svelte';
    import { base } from '$app/paths';
</script>
<script>
    export let contents;
    export let style = 'large';
    let contentTypes = {
      blogPost: 'Blog post',
      project: 'Project'
    };
</script>
<style>
  .container {
      display: grid;
       grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
  .small.container {
    grid-template-columns: 1fr;
  }
  article {
    border: 1px solid var(--color-secondary-1);
    background-color: var(--color-background-2);
   
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
  }
  .content-type {
    font-family: var(--font-family-sans-2);
    margin: -0.5em 0 0;
    text-transform: uppercase;
    font-size: 0.85rem;
  }
  .card-text {
    flex-grow: 1;
  }
</style>
<div class:small="{style == 'small'}" class="container g2">
    {#each contents as content}
    {@const contentType = contentTypes[content.sys.contentType.sys.id]}
    <article class="fx" class:fd-c="{style == 'large'}">
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
              <h1 class="not-h1 h2"><a href="{base}/content/{idsToSlugs[content.sys.id]}">{content.fields.title}</a></h1>
            </header>
            <main>
              <p class="ts-s">{content.fields.snippet}</p>
              {#if style == 'small'}
              <p class="ts-s date"><span class="vsh">Published</span> <time datetime={content.fields.datePublished}>{new Date(content.fields.datePublished).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time></p>
              {/if}
            </main>
        </div>
    </article>
    {/each}
</div>
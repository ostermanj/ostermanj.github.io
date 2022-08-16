<script context="module">
    import idsToSlugs from '$src/idlist.json';
    import PostThumb from '$components/PostThumb.svelte';
    import PostThumbLarge from '$components/PostThumbLarge.svelte';
</script>
<script>
    export let contents;
    export let style = 'large';
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
  
</style>
<div class:small="{style == 'small'}" class="container g2">
    {#each contents as content}
    <article class="fx" class:fd-c="{style == 'large'}">
      {#if content.fields.heroImage}
        {#if style == 'small'}
       <PostThumb file="{content.fields.heroImage.fields.file}" />
       {:else}
       <PostThumbLarge file="{content.fields.heroImage.fields.file}" />
       {/if}
       {/if}
        <div class="p1">
            <h1 class="not-h1 h2"><a href="/post/{idsToSlugs[content.sys.id]}">{content.fields.title}</a></h1>
            <p class="ts-s">{content.fields.snippet}</p>
            {#if style == 'small'}
            <p class="ts-s date"><span class="vsh">Published</span> <time datetime={content.fields.datePublished}>{new Date(content.fields.datePublished).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time></p>
            {/if}
        </div>
    </article>
    {/each}
</div>
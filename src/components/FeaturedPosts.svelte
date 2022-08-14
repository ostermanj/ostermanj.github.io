<script context="module">
    import idsToSlugs from '$src/idlist.js';
    import PostThumb from '$components/PostThumb.svelte';
</script>
<script>
    export let featuredPosts;
</script>
<style>
  .container {
      display: grid;
       grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      
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
<h2>Blog posts</h2>
<div class="container g2">
    {#each featuredPosts as feature}
    <article class="fx fd-c">
       <PostThumb file="{feature.fields.heroImage.fields.file}" />
        <div class="p1">
            <h1 class="h2"><a href="/post/{idsToSlugs[feature.sys.id]}">{feature.fields.title}</a></h1>
            <p class="ts-s">{feature.fields.snippet}</p>
        </div>
    </article>
    {/each}
</div>
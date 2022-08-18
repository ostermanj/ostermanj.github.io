<script context="module">
    throw new Error("@migration task: Check code was safely removed (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292722)");

    // import ContentCard from '$components/ContentCard.svelte';
    // import { paginate, LightPaginationNav } from 'svelte-paginate';
</script>
<script>
    throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

    export let items;
    export let type;
    let currentPage = 1;
    let pageSize = 10;
    $: paginatedItems = paginate({ items, pageSize, currentPage })
</script>
<style>
    h1 {
        margin-bottom: 0.5em;
    }
</style>
<section>
    {#if type == 'blogPost'}
    <h1>Blog posts</h1>
    {:else}
    <h1>Projects</h1>
    {/if}
    <ContentCard contents="{paginatedItems}" style="small" />
    {#if items.length > pageSize }
    <LightPaginationNav
        totalItems="{items.length}"
        pageSize="{pageSize}"
        currentPage="{currentPage}"
        limit="{1}"
        showStepOptions="{true}"
        on:setPage="{(e) => currentPage = e.detail.page}"
        />
        {/if}
</section>
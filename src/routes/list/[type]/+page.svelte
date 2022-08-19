<script context="module">
    import ContentCard from '$components/ContentCard.svelte';
    import { paginate, LightPaginationNav } from 'svelte-paginate';
</script>
<script>
    export let data;
    $: ({items, type} = data);
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
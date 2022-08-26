<script context="module">
    import ContentCard from '$components/ContentCard.svelte';
    import { paginate, LightPaginationNav } from 'svelte-paginate';
</script>
<script>
    export let data;
    $: ({items, type} = data);
    $: typeName = type == 'blogPost' ? 'Blog posts' : 'Projects';
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
    <h1>{typeName}</h1>
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
<script context="module">
    import ContentCard from '$components/ContentCard.svelte';
    import { paginate, LightPaginationNav } from 'svelte-paginate';
</script>
<script>
 export let data;
    $: ({
        title,
        body,
        posts,
    } = data);
    $:items = posts.items;
    let currentPage = 1;
    let pageSize = 10;
    $: paginatedItems = paginate({ items, pageSize, currentPage })
</script>
<section>
    <h1 class="not-h1 h2">{title}</h1>
    {@html body}
    <hr>
    <ContentCard contents="{paginatedItems}" style="small" parent="peace-corps"/>
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
<style>
    h1 {
        font-size: 2.6rem;
        text-align: center;
        margin-block-start: 1em;
        margin-block-end: 1.5em;
    }
    :global(.wrapper--peace-corps figure) {
        margin-inline: 0;
        display: inline-block;
        padding: 15px;
        box-shadow: var(--box-shadow);
        border-radius: 2px;
        font-family: 'Passion One', sans-serif;
        flex: 1 3 250px;
        align-self: flex-start;
    }
    :global(.wrapper--peace-corps figcaption){
        padding-inline: calc(var(--padding) / 2);
        letter-spacing: 0.5px; 
    }
    :global(.wrapper--peace-corps .fx) {
        flex-wrap: wrap;
        row-gap: 0;
    }
    :global(.wrapper--peace-corps .fx > div.fx-item){
        flex: 3 1 300px;
    }
    hr {
        margin-block-end: 1em;
    }
    
</style>
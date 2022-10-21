<script context="module">
    import ContentCard from '$components/ContentCard.svelte';
    import { paginate, LightPaginationNav } from 'svelte-paginate';
</script>
<script>
 export let data;
    $: ({
        seriesTitle,
        secondaryTitle,
        body,
        posts,
    } = data);
    $:items = posts.items;
    let currentPage = 1;
    let pageSize = 10;
    $: paginatedItems = paginate({ items, pageSize, currentPage })
</script>
<section>
    <header>
        <h1 class="not-h1">{seriesTitle}</h1>
        <p class="h2">{secondaryTitle}</p>
    </header>
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
        font-size: clamp(34px, 10.625vw, 5rem);
        font-family: 'Cavet', cursive;
        /* filter: url('#noise-liter'); */
        text-align: center;
        margin-block-start: 0.5em;
        margin-block-end: 0.2em;
        line-height: 1;
        color: var(--color-primary-1);
        filter: url('#noise-liter');
    }
    @media screen and (min-width: 515px){
        h1 {
            filter: url('#noise-lite');
        }
    }
    .h2 {
        margin: 0;
        text-align: center;
        margin-block-end: 2em;
        font-size: clamp(1.1rem, 5vw, 1.45rem);
    }
    
    hr {
        margin-block-end: 1em;
    }
    
</style>
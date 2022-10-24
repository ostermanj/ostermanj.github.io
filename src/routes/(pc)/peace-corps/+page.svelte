<script context="module">
    /* global mapboxgl */
    import ContentCard from '$components/ContentCard.svelte';
    import { paginate, LightPaginationNav } from 'svelte-paginate';
    import { onMount } from 'svelte';
    export const hydrate = true;
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
    $: paginatedItems = paginate({ items, pageSize, currentPage });
</script>
<svelte:head>
    <script defer src='https://api.mapbox.com/mapbox-gl-js/v2.10.0/mapbox-gl.js'></script>
    <script defer src='/init-map.js'></script>
    <link href='https://api.mapbox.com/mapbox-gl-js/v2.10.0/mapbox-gl.css' rel='stylesheet' />
</svelte:head>
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
        margin-block-start: 3em;
        margin-block-end: 1em;
    }
    :global(#map-cont) {
        position: relative;
        width: 100%;
        padding-bottom: 56.25%;
    }
    :global(#map-cont--inner){
        position: absolute; 
        inset: 0;
    }
    
</style>
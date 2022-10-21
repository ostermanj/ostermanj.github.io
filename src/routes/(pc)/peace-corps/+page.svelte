<script context="module">
    /* global mapboxgl */
    import ContentCard from '$components/ContentCard.svelte';
    import { paginate, LightPaginationNav } from 'svelte-paginate';
    import { onMount } from 'svelte';
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
    function callback(entries, observer){
        entries.forEach(entry => {
            if (entry.isIntersecting){
                window._map.flyTo({
                    center: [-11.0813, 21.1456],
                    zoom: 3.9
                });
                observer.disconnect();
            }
        })
    }
    onMount(() => {
        const container = document.getElementById('map-cont');
        container?.insertAdjacentHTML('afterbegin','<div id="map-cont--inner"></div>');
        mapboxgl.accessToken = 'pk.eyJ1Ijoib3N0ZXJtYW5qIiwiYSI6ImNsOWl5NmF5ZTA4ODgzd28wczZ3bm9oYm0ifQ.qLNG2qiKlw8RkjFlHwsHhQ';
            window._map = new mapboxgl.Map({
            container: 'map-cont--inner', // container ID
            style: 'mapbox://styles/mapbox/satellite-streets-v11', // style URL
            center: [-100.4544, 37.0351], // starting position [lng, lat]
            // center: [-11.0813, 21.1456], // starting position [lng, lat]
            zoom: 1.256, // starting zoom
            // zoom: 3.9, // starting zoom
            projection: 'globe' // display the map as a 3D globe
            });

        window._map.on('load', () => {
            const options = {
                root: null,
                threshold: 1
            };
            const observer = new IntersectionObserver(callback, options);
            observer.observe(container);
        })
    })
</script>
<svelte:head>
    <script src='https://api.mapbox.com/mapbox-gl-js/v2.10.0/mapbox-gl.js'></script>
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
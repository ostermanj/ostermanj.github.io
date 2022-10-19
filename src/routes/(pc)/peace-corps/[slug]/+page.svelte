<script context="module">
    import Sprite from '$components/Sprite.svelte';
</script>
<script lang="ts">
    export let data;
    $: ({
        title,
        subtitle,
        body,
        datePublished,
        contentType,
        link,
    } = data);

</script>
<style>
    header {
        margin-bottom: 4rem;
    }
    h1 {
        font-size: 2.5rem;
        text-align: center;
        margin-block-start: 1em;
        margin-block-end: 0
    }
    .date {
        color: var(--text-color-light);
        margin-block: 0;
        font-family: var(--font-family-sans-2);
        text-align: center;
    }
    .external-link {
        
    }
    .external-link > div:first-child {
       flex-shrink: 0;
    }
    .external-link > div:last-child {
       width: calc(100% - 35px);
       max-width: 300px;
       white-space: nowrap;
       overflow: hidden;
       text-overflow: ellipsis;
       position: relative;
       top: 2px;
    }
    .subtitle {
        text-align: center;
    }
    :global(.wrapper--peace-corps blockquote) {
        font-family: 'Caveat', serif;
        font-size: 1.3rem;
        padding: var(--padding);
        box-shadow: var(--box-shadow);
    }
</style>
<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Caveat&display=swap" rel="stylesheet"> 
</svelte:head>
<article class="article-post">
    <header>
        <hgroup>
            <h1 class="not-h1 h2">{title}</h1>
            {#if subtitle}
            <p class="subtitle">{subtitle}</p>
            {/if}
        </hgroup>
        <p class="date">
            <span>Posted</span>
            <time datetime={datePublished}>{new Date(datePublished).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
        </p>
    </header>
    <main>{@html body}</main>
</article>

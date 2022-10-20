<script context="module">
    import Sprite from '$components/Sprite.svelte';
</script>
<script lang="ts">
    export let data;
    $: ({
        title,
        seriesTitle,
        subtitle,
        body,
        datePublished,
    } = data);

</script>
<style>
    header {
        margin-bottom: 4rem;
        font-family: 'Passion One';
        /* display: flex;
        justify-content: center; */
    }
    h1 {
        font-size: 2.5rem;
        margin-block-start: 0;
        margin-block-end: 0
    }
    .series-name {
        margin-block-end: 0;
    }
    .series-name::before {
        content: '< '
    }
    .date {
        color: var(--text-color-light);
        margin-block: 0;
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
        background-color: var(--color-background-2);
    }
</style>
<article class="article-post">
    <header>
        <div>
            <p class="series-name"><a href="./..">{seriesTitle}</a></p>
            <h1 class="not-h1 h2">{title}</h1>
            {#if subtitle}
            <p class="subtitle">{subtitle}</p>
            {/if}
            <p class="date">
                <span>Posted</span>
                <time datetime={datePublished}>{new Date(datePublished).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
            </p>
        </div>
    </header>
    <main>{@html body}</main>
</article>

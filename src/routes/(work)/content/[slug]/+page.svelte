<script context="module">
    import Tags from '$components/Tags.svelte';
    import Authors from '$components/Authors.svelte';
    import Sprite from '$components/Sprite.svelte';
</script>
<script lang="ts">
    export let data;
    $: ({
        title,
        subtitle,
        body,
        tags,
        datePublished,
        authors,
        contentType,
        link,
        repository
    } = data);
</script>
<style>
    header {
        margin-bottom: 4rem;
    }
    .date {
        color: var(--text-color-light);
        margin-bottom: 0;
        font-family: var(--font-family-sans);
        text-align: center;
        margin-block-start: -20px;
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
        margin-block-start: -20px;
        text-align: center;
    }
</style>
<article class="article-post">
    <header>
        <hgroup>
            <h1>{title}</h1>
            {#if subtitle}
            <p class="subtitle">{subtitle}</p>
            {/if}
        </hgroup>
        {#if authors}
        <Authors {authors} />
        {/if}
        <p class="date">
            <span class="vsh">Published</span>
            <time datetime={datePublished}>{new Date(datePublished).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
            | { contentType == 'project' ? 'Project' : 'Blog post'}
        </p>
        {#if contentType == 'project'}
            {#if link}
                <div class="fx ai-c g0-5 external-link">
                    <div class="fx ai-c">
                        <Sprite id="www" />
                    </div>
                    <div>In situ: <a href="{link}">{link.replace(/https?:\/\//, '')}</a></div>
                </div>
            {/if}
            {#if repository}
                <div class="fx ai-c g0-5 external-link">
                    <div class="fx ai-c">
                        <Sprite id="github" />
                    </div>
                    <div>Code: <a href="{repository}">{repository.replace(/https?:\/\//, '')}</a></div>
                </div>
            {/if}
        {/if}
    </header>
    <main>{@html body}</main>
</article>

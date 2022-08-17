<script context="module">
    import Tags from '$components/Tags.svelte';
    import Authors from '$components/Authors.svelte';
</script>
<script lang="ts">
    export let title: string;
    export let body: string;
    export let tags:[];
    export let datePublished: string;
    export let authors:[];
    export let contentType = '';
    export let link = '';
    export let repository = '';
</script>
<style>
    .date {
        margin-bottom: 3em;
        color: var(--text-color-light);
    }
</style>
<article class="article-post">
    <header>
        <h1>{title}</h1>
        <Tags {tags} />
        {#if authors}
        <Authors {authors} />
        {/if}
        <p class="date"><span class="vsh">Published</span> <time datetime={datePublished}>{new Date(datePublished).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time></p>
        {#if contentType == 'project'}
            {#if link}
                <a href="{link}">{link}</a>
            {/if}
            {#if repository}
                <a href="{repository}">{repository}</a>
            {/if}
        {/if}
    </header>
    <main>{@html body}</main>
</article>

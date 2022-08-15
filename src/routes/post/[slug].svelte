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
</script>
<style>
    
</style>
<article class="article-post">
    <header>
        <h1>{title}</h1>
        <Tags {tags} />
        <Authors {authors} />
        <p><span class="vsh">Published</span> <time datetime={datePublished}>{new Date(datePublished).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time></p>
    </header>
    <main>{@html body}</main>
</article>

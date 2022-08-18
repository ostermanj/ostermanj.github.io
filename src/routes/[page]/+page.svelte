<script context="module">
    throw new Error("@migration task: Check code was safely removed (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292722)");

    // import AboutPage from '$pages/about.svelte';
</script>
<script lang="ts">
    throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

    import type { About } from '$utils/contentfulTypes';
    export let fields:About;
    export let page: string;
</script>
<svelte:head>
    <title>About | John Osterman</title>
</svelte:head>
{#if page == 'about'}
<AboutPage {fields} />
{/if}
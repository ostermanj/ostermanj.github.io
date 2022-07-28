<script context="module">
    import AboutPage from '$pages/about.svelte';
</script>
<script lang="ts">
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
<pre>{JSON.stringify(fields.body, null, 2)}</pre>
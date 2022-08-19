<script context="module">
    import AboutPage from '$pages/about.svelte';
</script>
<script lang="ts">
    //import type { About } from '$utils/contentfulTypes';
    export let data;
    $: ({ page, fields } = data)
</script>
<svelte:head>
    <title>About | John Osterman</title>
</svelte:head>
{#if page == 'about'}
<AboutPage {fields} />
{/if}
<script context="module">
    import AboutPage from '$pages/about.svelte';
</script>
<script lang="ts">
    //import type { About } from '$utils/contentfulTypes';
    export let data;
    $: ({ page, fields } = data)
</script>
{#if page == 'about'}
<AboutPage {fields} />
{/if}
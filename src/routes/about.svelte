<script lang="ts">
    import {markdown} from 'markdown';
    export let body: string;
</script>
<svelte:head>
    <title>About | John Osterman</title>
</svelte:head>
<p>{@html markdown.toHTML(body)}</p>
<script context="module">
</script>
<script lang="ts">
    import { parse } from 'markdown';
    export let title: string;
    export let body: string;
    let bodyHTML = parse(body);
</script>
<h1>{title}</h1>
{@html bodyHTML}

<script context ="module">
</script>
<script lang="ts">
    import {markdown} from 'markdown';
    export let title: string;
    export let body: string;
    let bodyHTML = markdown.toHTML(body)
</script>
<h1>{title}</h1>
<div>{@html bodyHTML}</div>

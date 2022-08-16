<script context="module">
    import ContentCard from '$components/ContentCard.svelte';
</script>
<script>
    export let featuredPosts;
</script>
<h2>Featured</h2>
<ContentCard contents="{featuredPosts}" />
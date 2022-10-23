<script context="module">
    import ContentCard from '$components/ContentCard.svelte';
</script>
<script>
    export let featuredPosts;
</script>
<section>
    <h2>Featured posts and projects</h2>
    <ContentCard contents="{featuredPosts}" />
</section>
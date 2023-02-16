<script context="module">
    import ContentCard from '$components/ContentCard.svelte';
</script>
<script>
    export let featuredPosts;
</script>
<style>
    h2 {
        text-align: center;
        font-size: 2rem;
        margin-block-end: 1.5em;
    }
</style>
<section>
    <h2>Featured posts and projects</h2>
    <ContentCard contents="{featuredPosts}" />
</section>
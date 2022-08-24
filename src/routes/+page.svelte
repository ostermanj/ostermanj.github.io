<script context="module">
    import FeaturedWork from '$components/FeaturedWork.svelte';
    import FeaturedPosts from '$components/FeaturedPosts.svelte';
    
</script>
<script>
    export let data;
    $: ({ fields } = data);
</script>
<style>
    .overview {
        border-bottom: 2px solid var(--text-color);
        padding-bottom: 20px;
        text-shadow: var(--fallback-text-shadow);
    }
    .overview--test {
        font: var(--font-sans--test);
        text-shadow: 0.5px 0 var(--text-color), -0.5px 0 var(--text-color);
    }
    .body--test {
        font: var(--font-serif--test);
        opacity: 0.5;
    }
    div.test {
        position: relative;
    }
    div.test div {
        position: absolute;
    }
</style>
<p class="overview h2">{fields.overview}</p>
{@html fields.body}
{#if fields.featuredBlogPosts && fields.featuredBlogPosts.length }
 <FeaturedPosts featuredPosts={fields.featuredBlogPosts}/>
{/if}
{#if fields.featuredWorkExperience && fields.featuredWorkExperience.length }
 <FeaturedWork featuredWork={fields.featuredWorkExperience}/>
{/if}

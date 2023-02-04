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
        padding-bottom: 20px;
        text-shadow: var(--fallback-text-shadow);
        margin-block-start: 0;
        margin-block-end: 0;
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
    hr {
        width: 100%;
        height: 2px;
        background: linear-gradient(to right, var(--color-primary-1-dark), var(--color-primary-1-bright), var(--color-primary-1-dark));
        border-radius: 2px;
    }
</style>
<section title="introduction">
    <p class="overview h2">{fields.overview}</p>
    <hr>
    {@html fields.body}
</section>
{#if fields.featuredBlogPosts && fields.featuredBlogPosts.length }
 <FeaturedPosts featuredPosts={fields.featuredBlogPosts}/>
{/if}
{#if fields.featuredWorkExperience && fields.featuredWorkExperience.length }
 <FeaturedWork featuredWork={fields.featuredWorkExperience}/>
{/if}

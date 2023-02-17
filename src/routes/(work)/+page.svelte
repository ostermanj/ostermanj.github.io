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
    img {
        width: 125px;
        height: 125px;
        border-radius: 50%;
        margin: 0 auto;
        display: block;
        margin-block-start: -20px;
        margin-block-end: 20px;
        border: 3px solid transparent;
        background: linear-gradient(to bottom, var(--color-primary-1-bright), var(--color-primary-1-dark), var(--color-primary-1-bright));
    }
    
</style>
<section title="introduction">
    <img
        srcset="https://images.ctfassets.net/3qr5d6sj491p/6E2Gh0TS2hrqafgOY1NlHr/68804563485dfdb3f0cb50fb38e3e3fa/osterman-photo.jpg?f=face&w=250&h=250&fit=fill&fm=webp 2x, https://images.ctfassets.net/3qr5d6sj491p/6E2Gh0TS2hrqafgOY1NlHr/68804563485dfdb3f0cb50fb38e3e3fa/osterman-photo.jpg?f=face&w=125&h=125&fit=fill&fm=webp 1x"
        src="https://images.ctfassets.net/3qr5d6sj491p/6E2Gh0TS2hrqafgOY1NlHr/68804563485dfdb3f0cb50fb38e3e3fa/osterman-photo.jpg?f=face&w=125&h=125&fit=fill&fm=webp"
        alt="John Osterman: a White man with short brown hair and a graying beard, smiling outside in front of a brick wall with ivy on it."
    >
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

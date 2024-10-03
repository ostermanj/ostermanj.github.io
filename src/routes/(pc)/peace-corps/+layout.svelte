<script>
    import Header from '$components/peace-corps/Header.svelte';
    import Meta from '$components/Meta.svelte';
    import Footer from '$components/peace-corps/Footer.svelte';
    import SpriteFile from '$components/SpriteFile.svelte';
    import SVGFilters from '$components/SVGFilters.svelte';
    import { page } from '$app/stores';
    import { base } from '$app/paths';
    import { firstParagraphStripped } from '$src/scripts';
    let fontClassName = '';
    function toggleFonts(){
        const temp = document.documentElement.className;
        document.documentElement.className = fontClassName;
        fontClassName = temp;
    }
    // function ampersand(str){
    //     str = str.replace(/&amp;/g, '&');
    //     return decodeURIComponent(str);
    // }
    function returnHeroImageCrop(platform){
        if ($page.data?.heroImage){
            if (platform == 'twitter'){
                return `https:${$page.data.heroImage.fields.file.url}`;//;?${`w=${Math.round($page.data.heroImage.fields.file.details.image.height)}&h=${Math.round($page.data.heroImage.fields.file.details.image.height)}&fit=crop`   }`;
            }
            return `https:${$page.data.heroImage.fields.file.url}`;//?w=${Math.round($page.data.heroImage.fields.file.details.image.height * 1.778)}&h=${Math.round($page.data.heroImage.fields.file.details.image.height)}&fit=crop`;
        }
        if ($page.data?.hero){
            if (platform == 'twitter'){
                return `https:${$page.data.hero.fields.file.url}`;//;?${`w=${Math.round($page.data.hero.fields.file.details.image.height)}&h=${Math.round($page.data.hero.fields.file.details.image.height)}&fit=crop`   }`;
            }
            return `https:${$page.data.hero.fields.file.url}`;//?w=${Math.round($page.data.hero.fields.file.details.image.height * 1.778)}&h=${Math.round($page.data.hero.fields.file.details.image.height)}&fit=crop`;
        }
        return undefined;
    }
    $:metaImageTwitter = $page.data?.socialImage?.fields.file.url || returnHeroImageCrop('twitter') || 
        'https://images.ctfassets.net/3qr5d6sj491p/3hsUVFnQRMUJBECqvgw7y1/55fdac88ce3fd3159a506f119625a982/Screen_Shot_2022-08-23_at_11.53.20_AM.png';
    $:metaImage = $page.data?.socialImage?.fields.file.url || returnHeroImageCrop() || 
        'https://images.ctfassets.net/3qr5d6sj491p/3hsUVFnQRMUJBECqvgw7y1/55fdac88ce3fd3159a506f119625a982/Screen_Shot_2022-08-23_at_11.53.20_AM.png';
    
    $:fallbackMetaDescription = (function(){
        if (!$page.data.fields){
            return 'John Osterman, Returned Peace Corps Volunteer, Mauritania (2001–2003)';
        }
    })();
    $:metaDescription = (function(){
        return $page.data.fields?.overview 
        || $page.data.overview 
        || $page.data.fields?.snippet 
        || $page.data.snippet 
        || ($page.data.fields?.body ? firstParagraphStripped($page.data.fields.body) : undefined) 
        || ($page.data.body ? firstParagraphStripped($page.data.body) : undefined) 
        || $page.data.fields?.title 
        || $page.data.title 
        || fallbackMetaDescription
    })();
    $:fallbackMetaTitle = (function(){
        return 'Peace Corps Journals';
    })()
    $:metaTitle = $page.data.title || $page.data.seriesTitle || ( $page.data.page ? $page.data.page.charAt(0).toUpperCase() + $page.data.page.slice(1) : undefined) || fallbackMetaTitle;

    export let data;
    $: ({
        hero
    } = data);
</script>
<style>
    @import 'normalize.css';
    @import '$static/global.css';
    picture {
         --mask:
        radial-gradient(31.30px at 50% calc(100% - 42.00px),#000 99%,#0000 101%) calc(50% - 28px) 0/56px 100%,
        radial-gradient(31.30px at 50% calc(100% + 28.00px),#0000 99%,#000 101%) 50% calc(100% - 14px)/56px 100% repeat-x;
        -webkit-mask: var(--mask);
        mask: var(--mask);
    }
    .skip-nav {
        position: absolute;
        left: 50%;
        top: 5px;
        z-index: -1;
        /* transform: translateX(-50%); */
    }
    .skip-nav:focus {
        z-index: 1;
    }
    .hero-image {
        width: 100%;
        max-height: 275px;
        object-fit: cover;
        object-position: center;
    }
</style>
<svelte:head>
    {#if import.meta.env.PROD }
        <!-- Google tag (gtag.js) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-8P9T7XMGMD"></script>
        <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-8P9T7XMGMD');
        </script>
    {/if}
    <title>{metaTitle} | John Osterman</title>
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@johnaosterman" />
    <meta name="twitter:url" content="https://osterman.io{$page.url.pathname}" />
    <meta name="twitter:description" content="{metaDescription}" />
    <meta name="twitter:title" content="{metaTitle}" />    
    <Meta name="twitter:image" _content={metaImageTwitter} />
    <meta property="og:title" content="{metaTitle}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://osterman.io{$page.url.pathname}" />
    <meta property="og:image" content="{metaImage}" />
    <meta property="og:site_name" content="John Osterman" />
    <meta property="og:description" content="{metaDescription}" />
    <meta name="description" content="{metaDescription}" />
    <link rel="alternate" type="application/rss+xml" title="John Osterman" href="{base}/rss">
</svelte:head>
<a tabindex="0" class="skip-nav" href="#main-content">Skip to main content</a>
<div class="pc">
    <Header />
</div>
{#if import.meta.env.DEV }
<!-- <button on:click="{toggleFonts}">toggle fonts</button> -->
{/if}
<picture>
     <source media="(min-width: 1441px)" srcset="{hero.fields.file.url}?w={3840}&h={1322}&fm=avif&q=80 2x, {hero.fields.file.url}?w={3840 / 2}&h={1322 / 2}&fm=avif&q=80 1x" type="image/avif">
    <source media="(min-width: 1441px)" srcset="{hero.fields.file.url}?w={3840}&h={1322}&fm=webp&q=80 2x, {hero.fields.file.url}?w={3840 / 2}&h={1322 / 2}&fm=webp&q=80 1x" type="image/webp">
    <source media="(min-width: 1441px)" srcset="{hero.fields.file.url}?w={3840}&h={1322}&fm=png&q=80 2x, {hero.fields.file.url}?w={3840 / 2}&h={1322 / 2}&fm=png&q=80 1x" type="image/png">
    <source media="(min-width: 501px)" srcset="{hero.fields.file.url}?w={2880}&h={992}&fm=avif&q=80 2x, {hero.fields.file.url}?w={2880 / 2}&h={992 / 2}&fm=avif&q=80 1x" type="image/avif">
    <source media="(min-width: 501px)" srcset="{hero.fields.file.url}?w={2880}&h={992}&fm=webp&q=80 2x, {hero.fields.file.url}?w={2880 / 2}&h={992 / 2}&fm=webp&q=80 1x" type="image/webp">
    <source media="(min-width: 501px)" srcset="{hero.fields.file.url}?w={2880}&h={992}&fm=png&q=80 2x, {hero.fields.file.url}?w={2880 / 2}&h={992 / 2}&fm=png&q=80 1x" type="image/png">
    <source srcset="{hero.fields.file.url}?w={830}&h={286}&fm=avif&q=80 2x, {hero.fields.file.url}?w={830 / 2}&h={286 / 2}&fm=avif&q=80 1x" type="image/avif">
    <source srcset="{hero.fields.file.url}?w={830}&h={286}&fm=webp&q=80 2x, {hero.fields.file.url}?w={830 / 2}&h={286 / 2}&fm=webp&q=80 1x" type="image/webp">
    <source srcset="{hero.fields.file.url}?w={830}&h={286}&fm=png&q=80 2x, {hero.fields.file.url}?w={830 / 2}&h={286 / 2}&fm=png&q=80 1x" type="image/png">
    <img class="hero-image" width="{2880 / 2}" height="{992 / 2}" src="{hero.fields.file.url}?w={2880 / 2}&h={992 / 2}&q=80" alt="{hero.fields.description}">
</picture>
<main class="wrapper wrapper--peace-corps" id="main-content">
    <slot></slot>
</main>
<Footer />
<SpriteFile />
<SVGFilters />

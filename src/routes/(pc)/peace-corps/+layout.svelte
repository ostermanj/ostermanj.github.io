<script>
    import Header from '$components/peace-corps/Header.svelte';
    import Footer from '$components/Footer.svelte';
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
    $:metaImage = $page.data?.socialImage?.fields.file.url ||
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
    $:metaTitle = $page.data.title || ( $page.data.page ? $page.data.page.charAt(0).toUpperCase() + $page.data.page.slice(1) : undefined) || fallbackMetaTitle;
</script>
<style>
    @import 'normalize.css';
    @import '$static/global.css';
    .skip-nav {
        position: absolute;
        left: 50%;
        top: 5px;
        transform: translateX(-50%);
    }
    .skip-nav:focus {
        z-index: 1;
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
    <meta name="twitter:image" content="{metaImage}" />
    <meta property="og:title" content="{metaTitle}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://osterman.io{$page.url.pathname}" />
    <meta property="og:image" content="{metaImage}" />
    <meta property="og:site_name" content="John Osterman" />
    <meta property="og:description" content="{metaDescription}" />
    <link rel="alternate" type="application/rss+xml" title="John Osterman" href="{base}/rss">
</svelte:head>
<a tabindex="0" class="skip-nav" href="#main-content">Skip to main content</a>
<Header />
{#if import.meta.env.PROD }
<button on:click="{toggleFonts}">toggle fonts</button>
{/if}
<main class="wrapper" id="main-content">
    <slot></slot>
</main>
<Footer />
<SpriteFile />
<SVGFilters />

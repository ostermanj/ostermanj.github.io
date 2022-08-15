<script>
    import Header from '$components/Header.svelte';
    import Footer from '$components/Footer.svelte';
    import SpriteFile from '$components/SpriteFile.svelte';
    import SVGFilters from '$components/SVGFilters.svelte';
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
<a tabindex="0" class="skip-nav" href="#main-content">Skip to main content</a>
<Header />
<main class="wrapper" id="main-content">
    <slot></slot>
</main>
<Footer />
<SpriteFile />
<SVGFilters />

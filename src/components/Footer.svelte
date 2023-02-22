<script context="module">
    import Social from '$components/Social.svelte';
     import SpriteFile from '$components/SpriteFile.svelte';
    import SVGFilters from '$components/SVGFilters.svelte';
</script>
<style>
    footer {
        border-top: 1px solid var(--color-secondary-1);
        border-bottom: 5px solid var(--color-primary-1);
        background-color: var(--color-background-2);
        min-height: 56px;
        position: sticky;
        top: 800px;
        padding: 22px 0;
        margin-top: var(--padding-2);
    }
    address {
        font-style: normal;
        
    }
    address > div {
        flex-grow: 1;
    }
    .tagline {
        width: 335px;
        margin: 0;
        flex-grow: 1;
        
    }
    .social {
        margin-top: 0.2em;
    }
    .wrapper {
        row-gap: 0;
    }
</style>
<footer role="contentinfo">
    <div class="wrapper fx fx-wrap g2">
        <address>
            <div>John Osterman<br /><a href="mailto:john@osterman.io">john@osterman.io</a></div>
            <div class="social">
                <Social />
            </div>
        </address>
        <p class="tagline h2">Web development and data visualization for mission-driven organizations.</p>
    </div>
    <SpriteFile />
    <SVGFilters />
</footer>
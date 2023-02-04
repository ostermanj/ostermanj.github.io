<script>
    import Name from '$components/Name.svelte';
    import Social from './Social.svelte';
    import { base } from '$app/paths';
</script>
<style>
    header {
        background: linear-gradient(to right, var(--color-primary-1-dark), var(--color-primary-1-bright), var(--color-primary-1-dark) );
        margin-block-end: 2rem;
        z-index: 2;
        --mask:
        radial-gradient(31.30px at 50% calc(100% - 42.00px),#000 99%,#0000 101%) calc(50% - 28px) 0/56px 100%,
        radial-gradient(31.30px at 50% calc(100% + 28.00px),#0000 99%,#000 101%) 50% calc(100% - 14px)/56px 100% repeat-x;
        -webkit-mask: var(--mask);
        mask: var(--mask);
        padding-block-end: 2px;
    }
    .first-inner {
        padding: 15px 0 32px;
        min-height: 56px;
        width: 100%;
        -webkit-mask: var(--mask);
        mask: var(--mask);
        background-color: var(--color-background-2);
        transform: scale(1.01);
        
    }
    h1 {
        margin: 0;
        height: 72px;
    }
    nav {
        gap: clamp(15px, 4.6vw, 20px);
    }
    .nav-link {
        color: var(--text-color);
        font-family: var(--font-family-sans);
        font-weight: bold;
        text-shadow: var(--fallback-text-shadow);
    }
    .nav-link:hover, .nav-link:focus {
        color: var(--color-primary-1);
        text-shadow: var(--fallback-text-color--primary)
    }
    .inner {
        width: 100%;
        max-width: 350px;
        box-sizing: content-box;
    }
    
</style>
<header class="fx jc-c">
    <div class="fx fd-c ai-c first-inner">
        <div class="fx fd-c ai-c jc-sb pi1 inner">
            <h1 class="not-h1">
                <a class="bw-0" href="{base}/">
                    <Name />
                    <span class="vsh">John Osterman</span>
                </a>
            </h1>
            <Social />
            <nav class="fx">
                <a class="bw-0 nav-link" href="{base}/about">About</a>
                <a class="bw-0 nav-link" href="{base}/list/blogPost">Blog posts</a>
                <a class="bw-0 nav-link" href="{base}/list/project">Projects</a>
                <a class="bw-0 nav-link" href="{base}/peace-corps">Peace Corps</a>
            </nav>
        </div>
    </div>
</header>
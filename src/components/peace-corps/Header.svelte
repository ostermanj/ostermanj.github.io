<script>
    import Name from '$components/Name.svelte';
    import Social from '../Social.svelte';
    import { base } from '$app/paths';
</script>
<style>
    header {
        border-top: 5px solid var(--color-secondary-1);
        border-bottom: 1px solid var(--color-primary-1);
        background-color: var(--color-background-2);
        position: sticky;
        top: 0px;
        margin-block-end: 2rem;
        padding: 22px 0;
        z-index: 2;
    }
    h1 {
        margin: 0;
    }
    .inner {
        width: 100%;
        max-width: 250px;
        box-sizing: content-box;
        line-height: 1;
    }
    
</style>
<header class="fx jc-c">
    <div class="fx fd-c ai-c jc-sb pi1 inner">
        <h1 class="not-h1">
            <a class="bw-0" href="{base}/">
                <Name />
                <span class="vsh">John Osterman</span>
            </a>
        </h1>
        <!-- <Social />
        <nav class="fx">
            <a class="bw-0 nav-link" href="{base}/about">About</a>
            <a class="bw-0 nav-link" href="{base}/list/blogPost">Blog posts</a>
            <a class="bw-0 nav-link" href="{base}/list/project">Projects</a>
        </nav> -->
    </div>
</header>
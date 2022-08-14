<script>
    import Name from '$components/Name.svelte';
import Social from './Social.svelte';
</script>
<style>
    header {
        border-top: 5px solid var(--color-secondary-1);
        border-bottom: 1px solid var(--color-primary-1);
        background-color: var(--color-background-2);
        min-height: 56px;
        position: sticky;
        top: -150px;
        margin-block-end: 2rem;
        height: 162px;
        padding: 22px 0;
    }
    h1 {
        margin: 0;
    }
    nav {
        gap: 20px;
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
    <div class="fx fd-c ai-c jc-sb pi1 inner">
        <h1>
            <a class="bw-0" href="/">
                <Name />
                <span class="vsh">John Osterman</span>
            </a>
        </h1>
        <Social />
        <nav class="fx">
            <a class="bw-0 nav-link" href="/about">About</a>
            <a class="bw-0 nav-link" href="/resume">Resume</a>
        </nav>
    </div>
</header>
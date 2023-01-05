<script>
    export let file = {};
    export let parent = '';
</script>
<style>
    .container {
        flex: 1 0 25%;
        overflow: hidden;
        position: relative;
        background-color: var(--color-secondary-1);
        align-self: flex-start;
    }
    .container.peace-corps {
        background-color: transparent;
    }
    picture {
        line-height: 0;
        background-color: transparent;
        width: 100%;
    }
    picture.bg-image {
        filter: blur(5px) opacity(0.7);
        transform: scale(1.1);
        align-self: stretch;
        position: absolute;
        height: 100%;
    }
    picture.bg-image img {
        object-fit: cover;
    }
    img {
        width: 100%;
        aspect-ratio: 352 /247;
        object-fit: contain;
        max-width: 400px;
        margin: 0 auto;
        z-index: 1;
        border: 5px solid transparent;
        box-sizing: border-box;
    }
    .peace-corps img {
        object-position: top;
        border-width:0 ;
    }
    
</style>
<div class:peace-corps="{parent == 'peace-corps'}" class="container fx">
    {#if parent !== 'peace-corps'}
    <picture class="fx bg-image">
        <source srcset="{file.url}?w=482&h=338&fm=avif&q=30 2x, {file.url}?w=241&h=169&fm=avif&q=30 1x" type="image/avif">
        <source srcset="{file.url}?w=482&h=338&fm=webp&q=30 2x, {file.url}?w=241&h=169&fm=webp&q=30 1x" type="image/webp">
        <source srcset="{file.url}?w=482&h=338&fm=png&q=30 2x, {file.url}?w=241&h=169&fm=png&q=30 1x" type="image/png">
        <img loading="lazy" width="241" height="169" src="{file.url}?w=241&h=169" alt="">
    </picture>
    {/if}
    <picture class="fx">
        <source srcset="{file.url}?w=482&h=338&fm=avif&q=30 2x, {file.url}?w=241&h=169&fm=avif&q=30 1x" type="image/avif">
        <source srcset="{file.url}?w=482&h=338&fm=webp&q=30 2x, {file.url}?w=241&h=169&fm=webp&q=30 1x" type="image/webp">
        <source srcset="{file.url}?w=482&h=338&fm=png&q=30 2x, {file.url}?w=241&h=169&fm=png&q=30 1x" type="image/png">
        <img loading="lazy" width="241" height="169" src="{file.url}?w=241&h=169" alt="">
    </picture>
    </div>

<script>
    export let file = {};
</script>
<style>
    .container {
        position: relative;
        overflow: hidden;
        background-color: var(--color-secondary-1)
    }
    picture {
        line-height: 0;
        position: relative;
    }
    picture.bg-image {
        inset: 0;
        position: absolute;
        filter: blur(5px) opacity(0.7);
        transform: scale(1.1);
    }
    img {
        width: 100%;
        aspect-ratio: 352 /247;
        object-fit: cover;
        max-width: 400px;
        margin: 0 auto;
        z-index: 1;
        border: 5px solid transparent;
    }
    picture.bg-image img {
        object-fit: cover;
        max-width: 100%;
    }
</style>
<div class="container">
    <picture class="fx bg-image">
        <source srcset="{file.url}?w=482&h=338&fm=avif&q=30 2x, {file.url}?w=241&h=169&fm=avif&q=30 1x" type="image/avif">
        <source srcset="{file.url}?w=482&h=338&fm=webp&q=30 2x, {file.url}?w=241&h=169&fm=webp&q=30 1x" type="image/webp">
        <source srcset="{file.url}?w=482&h=338&fm=png&q=30 2x, {file.url}?w=241&h=169&fm=png&q=30 1x" type="image/png">
        <img loading="lazy" width="241" height="169" src="{file.url}?w=241&h=169" alt="">
    </picture>
    <picture class="fx">
        <source srcset="{file.url}?w=482&h=338&fm=avif&q=30 2x, {file.url}?w=241&h=169&fm=avif&q=30 1x" type="image/avif">
        <source srcset="{file.url}?w=482&h=338&fm=webp&q=30 2x, {file.url}?w=241&h=169&fm=webp&q=30 1x" type="image/webp">
        <source srcset="{file.url}?w=482&h=338&fm=png&q=30 2x, {file.url}?w=241&h=169&fm=png&q=30 1x" type="image/png">
        <img loading="lazy" width="241" height="169" src="{file.url}?w=241&h=169" alt="">
    </picture>
</div>
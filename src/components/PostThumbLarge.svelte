<script>
    export let file = {};
</script>
<style>
    .container {
        position: relative;
        overflow: hidden;
        background-color: transparent;
        /* border-radius: 16.5px 16.5px 0 0; */
    }
    :global(article:first-of-type) .container {
        border-radius: 16.5px 16.5px 0 0;
    }
    @media screen and (min-width:571px) {
        :global(article:first-of-type) .container {
            border-radius: 16.5px 0 0 0;
        }
        :global(article:nth-of-type(2)) .container {
            border-radius: 0 16.5px 0 0;
        }
    }
    picture {
        line-height: 0;
        position: relative;
    }
    picture.bg-image {
        filter: blur(5px) opacity(0.7);
        transform: scale(1.1);
    }
    picture.foreground {
        inset: 0;
        position: absolute;
    }
    img {
        width: 100%;
        max-width: 400px;
        margin: 0 auto;
        z-index: 1;
        border: 5px solid transparent;
    }
    picture.bg-image img {
        aspect-ratio: 352 / 247;
        object-fit: cover;
        max-width: 100%;
    }
    picture.foreground img {
        object-fit: contain;
        box-sizing: border-box;
    }
</style>
<div class="container">
    <picture aria-hidden="true" class="fx bg-image">
        <source srcset="{file.url}?w=482&h=338&fm=avif&q=30 2x, {file.url}?w=241&h=169&fm=avif&q=30 1x" type="image/avif">
        <source srcset="{file.url}?w=482&h=338&fm=webp&q=30 2x, {file.url}?w=241&h=169&fm=webp&q=30 1x" type="image/webp">
        <source srcset="{file.url}?w=482&h=338&fm=png&q=30 2x, {file.url}?w=241&h=169&fm=png&q=30 1x" type="image/png">
        <img loading="lazy" width="241" height="169" src="{file.url}?w=241&h=169" alt="">
    </picture>
    <picture class="fx foreground">
        <source srcset="{file.url}?w=482&h=338&fm=avif&q=30 2x, {file.url}?w=241&h=169&fm=avif&q=30 1x" type="image/avif">
        <source srcset="{file.url}?w=482&h=338&fm=webp&q=30 2x, {file.url}?w=241&h=169&fm=webp&q=30 1x" type="image/webp">
        <source srcset="{file.url}?w=482&h=338&fm=png&q=30 2x, {file.url}?w=241&h=169&fm=png&q=30 1x" type="image/png">
        <img loading="lazy" width="241" height="169" src="{file.url}?w=241&h=169" alt="">
    </picture>
</div>
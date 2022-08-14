<script>
    export let file = {};
</script>
<style>
    picture {
        line-height: 0;
        background-color: var(--color-secondary-1);
        position: relative;
    }
    
    img {
        width: 100%;
        aspect-ratio: 352 /247;
        object-fit: cover;
        max-width: 400px;
        margin: 0 auto;
        z-index: 1;
    }
</style>
<picture class="fx">
    <source srcset="{file.url}?w=482&h=338&fm=avif&q=30 2x, {file.url}?w=241&h=169&fm=avif&q=30 1x" type="image/avif">
    <source srcset="{file.url}?w=482&h=338&fm=webp&q=30 2x, {file.url}?w=241&h=169&fm=webp&q=30 1x" type="image/webp">
    <source srcset="{file.url}?w=482&h=338&fm=png&q=30 2x, {file.url}?w=241&h=169&fm=png&q=30 1x" type="image/png">
    <img width="241" height="169" src="{file.url}?w=241&h=169" alt="">
</picture>

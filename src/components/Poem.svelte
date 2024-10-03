<script>
    export let data;
     $: ({
        body,
        heroImage
    } = data);
</script>
<article class="poem">
    <div class="poem-imgContainer">
        <img class="poem-image" src="{heroImage.fields.file.url}?fm=webp" alt="{heroImage.fields.file.description}" width="{heroImage.fields.file.details.image.width}" height="{heroImage.fields.file.details.image.height}">
    </div>
    <div class="poem-text">{@html body}</div>
</article>
<style lang="scss">
    :global(.first-letter), :global(html.wf-librebaskerville-n7-active .first-letter) {
        all: revert !important;
    }
    :global(.hero-image){
        display: none;
    }
    :global(header), :global(footer) {
        background-color:  color-mix(in srgb, var(--color-background-2) 70%, transparent) !important;
        backdrop-filter: blur(2px);
    }
    .poem {
        display: grid;
        grid-template-rows: 1fr;
        width: 100vw;
        min-height: 100vh;
        position: relative;
        left: 50%;
        right: 50%;
        margin-left: -50vw;
        margin-right: -50vw;
        margin-top: -52px;
        margin-bottom: -162px;
        z-index: -1;
        font-family: 'Passion One', sans-serif;
        > * {
            grid-row: 1;
            grid-column: 1;
        }
    }
    .poem-imgContainer {
        display: flex;
        flex-direction: column;
    }
    .poem-image {
        height: 0;
        flex: 1 0 0px;
        object-fit: cover;
    }
    .poem-text {
        color: #fff;
        font-size: 2rem;
        justify-self: end;
        align-self: center;
        margin: 0 2em 2em;
        letter-spacing: 1px;
        text-indent: -1em;
        :global(p) {
            margin: 0;
        };
    }
</style>
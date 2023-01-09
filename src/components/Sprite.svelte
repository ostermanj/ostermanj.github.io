<script>
    export let id = '';
    export let width = 24;
    export let height = 24;
    export let offset = 0;
</script>
<style>
    svg {
        position: relative;
    }
    svg:hover, svg:focus, :global(body.dark) svg:hover, :global(body.dark) svg:focus {
        fill: var(--color-primary-1)
	}
    :global(body.dark) svg {
        filter: invert(1)
    }
    :global(body.dark) svg:hover, :global(body.dark) svg:focus {
        filter: invert(0)
    }
</style>
<svg {width} {height} style:top={offset}px>
    <use xlink:href="#svg-{id}"></use>
</svg>
<script>
    export let id = '';
    export let width = 24;
    export let height = 24;
</script>
<style>
    svg:hover, svg:focus, :global(body.dark) svg:hover, :global(body.dark) svg:focus {
        fill: var(--color-primary-1)
	}
    :global(body.dark) svg {
        fill: #fff;
    }
</style>
<svg {width} {height}>
    <use xlink:href="#svg-{id}"></use>
</svg>
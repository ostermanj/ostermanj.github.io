<script>
    export let fields = {};
</script>
<style>
    .overview {
        font: var(--font-sans);
        letter-spacing: 1px;
        border-bottom: 2px solid var(--text-color);
        padding-bottom: 20px;
        text-shadow: var(--fallback-text-shadow);
    }
    .overview--test {
        font: var(--font-sans--test);
        text-shadow: 0.5px 0 var(--text-color), -0.5px 0 var(--text-color);
    }
    .body--test {
        font: var(--font-serif--test);
        opacity: 0.5;
    }
    div.test {
        position: relative;
    }
    div.test div {
        position: absolute;
    }
</style>
<svelte:head>
    <title>Home | John Osterman</title>
</svelte:head>
<p class="overview">{fields.overview}</p>
{@html fields.body}

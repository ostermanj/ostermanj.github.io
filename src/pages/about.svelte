<script lang="ts">
    import type { About } from '$utils/contentfulTypes';
    export let fields:About;
</script>
<h1>About</h1>
{@html fields.body}
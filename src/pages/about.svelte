<script lang="ts">
    import type { About } from '$utils/contentfulTypes';
    import { parse } from 'markdown';
    export let fields:About;
</script>
<p>{@html parse(fields.body)}</p>
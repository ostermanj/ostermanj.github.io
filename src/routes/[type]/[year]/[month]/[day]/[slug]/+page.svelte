<script>
    import { base } from '$app/paths';
    export let data;
    const { redirect } = data;
</script>
<svelte:head>
    <meta http-equiv="refresh" content="0;url={base}{redirect}" />
</svelte:head>
<p>Redirecting to new location . . .</p>
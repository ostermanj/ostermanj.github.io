<script>
    export let data;
    const { redirect } = data;
    export const router = false;
    export const hydrate = false;
</script>
<svelte:head>
    <meta http-equiv="refresh" content="0;url={redirect}/" />
</svelte:head>
<p>Redirecting to new location . . .</p>
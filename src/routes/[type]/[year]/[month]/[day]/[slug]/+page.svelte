<script>
    export let data;
    const { redirect } = data;
</script>
<svelte:head>
    <meta http-equiv="refresh" content="0;url={redirect}" />
</svelte:head>
<p>Redirecting to new location . . .</p>
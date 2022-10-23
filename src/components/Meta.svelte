<script>
    export let name;
    export let _content; 
    $:content = decodeURI(_content);
    console.log({name,_content});
</script>
<meta name="{name}" content="{content}" />
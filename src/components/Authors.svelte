<script lang="ts">
    export let authors:any[];
    function connector(i){
        if ( i == authors.length - 1){
            return '';
        }
        switch (authors.length){
            case 2:
                return ' and ';
            default:
                if ( i == authors.length - 2 ){
                    return ', and';
                }
                return ', ';
        }
    }
</script>
{#each authors as author, i}
    <a rel="author" href="/">{author.fields.fullName}</a>{connector(i)}
{/each}
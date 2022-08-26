<script lang="ts">
    import { base } from '$app/paths';
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
{#if authors.length > 1 || authors[0].fields.fullName !== 'John Osterman'}
{#each authors as author, i}
    <a rel="author" href="{base}/">{author.fields.fullName}</a>{connector(i)}
{/each}
{/if}
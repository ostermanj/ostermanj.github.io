<script lang="ts">
    export let tags:any[];
</script>
<p>Tags:</p>
<ul>
    {#each tags as tag}
        <li>{tag.fields.tag}</li>
    {/each}
</ul>
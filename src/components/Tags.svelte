<script lang="ts">
    export let tags:any[];
</script>
<style>
    li {
        color: var(--text-color);
        font: 0.625rem/1 Roboto, "Arial Narrow", Arial, sans-serif;
        text-transform: uppercase;
        padding: 0.5em;
        border-radius: 5px;
        display: inline-block;
        background-color: var(--color-primary-2);
        letter-spacing: 0.05em;
        
    }
</style>
<p class="vsh">Tags:</p>
<ul class="lns fx jc-c">
    {#each tags as tag}
        <li>{tag.fields.tag}</li>
    {/each}
</ul>
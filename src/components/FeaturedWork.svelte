<script>
    export let featuredWork;
</script>
<style>
    dl {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }
    dl div {
        border: 1px solid var(--color-secondary-1);
        background-color: var(--color-background-2);
    }
    dt, dd {
        padding: 0;
        margin: 0;
    }
    dt {
        color: var(--color-primary-1);
        font-weight: bold;
    }
    
</style>
<h2>Jobs</h2>
<dl class="g2">
    {#each featuredWork as feature}
    <div class="p1">
        <dt>
            <a href="{feature.fields.url}">{feature.fields.workPlaceName}</a>
        </dt>
        <dd class="ts-s">
            {feature.fields.title}, {feature.fields.startDate.split('-')[0]}–{feature.fields.endDate ? feature.fields.endDate.split('-')[0] : 'present'}
        </dd>
    </div>
    {/each}
</dl>
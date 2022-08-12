<script>
    export let featuredWork;
</script>
<h2>Professional experience</h2>
<dl>
    {#each featuredWork as feature}
    <div>
        <dt>
            {feature.fields.workPlaceName}
        </dt>
        <dd>
            {feature.fields.title}, {feature.fields.startDate.split('-')[0]}–{feature.fields.endDate ? feature.fields.endDate.split('-')[0] : 'present'}
        </dd>
    </div>
    {/each}
</dl>
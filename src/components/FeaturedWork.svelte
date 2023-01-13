<script>
    export let featuredWork;
</script>
<style>
    ol {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(calc(320px - var(--padding) * 2), 1fr));
        list-style: none;
        margin: 0;
        padding: 0;
    }
    li {
        border: 1px solid var(--color-secondary-1);
        background-color: var(--color-background-2);
        line-height: 1.6;
    }
    p {
        padding: 0;
        margin: 0;
    }
    a {
        font-weight: bold;
        display: inline-block;
        border-bottom-width: 0;
    }
    
</style>
<section>
    <h2>Jobs</h2>
    <ol class="g2">
        {#each featuredWork as feature}
        <li class="p1">
            <p><a href="{feature.fields.url}">{feature.fields.workPlaceName}</a>
                <span class="ts-s">{feature.fields.title}, {feature.fields.startDate.split('-')[0]}–{feature.fields.endDate ? feature.fields.endDate.split('-')[0] : 'present'}</span>
            </p>
        </li>
        {/each}
    </ol>
</section>
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
        background-color: var(--color-background-2);
        line-height: 1.6;
        padding: 3px;
    }
    li:nth-of-type(4n + 1){
        background: linear-gradient(to top right, var(--color-primary-1-bright), var(--color-primary-1-dark), var(--color-primary-1-bright));
    }
    li:nth-of-type(4n + 2){
        background: linear-gradient(to top left, var(--color-primary-1-bright), var(--color-primary-1-dark), var(--color-primary-1-bright));
    }
    li:nth-of-type(4n + 3){
        background: linear-gradient(to top left, var(--color-primary-1-bright), var(--color-primary-1-dark), var(--color-primary-1-bright));
    }
    li:nth-of-type(4n + 4){
        background: linear-gradient(to top right, var(--color-primary-1-bright), var(--color-primary-1-dark), var(--color-primary-1-bright));
    }
    .inner {
        background: linear-gradient(#faf8f800, #faf8f888 10px, #faf8f888 calc(100% - 10px), #faf8f800), linear-gradient(to right, #faf8f800, #faf8f888 10px, #faf8f888 calc(100% - 10px), #faf8f800);
        align-self: stretch;
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
    a:hover, a:focus {
        border-bottom-width: 0;
        text-decoration: underline;
    }
    
</style>
<section>
    <h2>Jobs</h2>
    <ol class="g2">
        {#each featuredWork as feature}
        <li class="fx">
            <div class="inner p1">
                <p><a href="{feature.fields.url}">{feature.fields.workPlaceName}</a>
                    <span class="ts-s">{feature.fields.title}, {feature.fields.startDate.split('-')[0]}–{feature.fields.endDate ? feature.fields.endDate.split('-')[0] : 'present'}</span>
                </p>
            </div>
        </li>
        {/each}
    </ol>
</section>
<script>
    export let featuredWork;
</script>
<style type="scss">
    ol {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        list-style: none;
        margin: 0;
        padding: 0;
        gap: 5cqi;
        @media screen and (max-width: 570px) {
            grid-template-columns: repeat(1, 1fr);
            
        }
    }
    li {
        background-color: var(--color-background-2);
        line-height: 1.6;
        padding: 3px;
        background-size: 125% 125%;
        background-position: 0 0;
        transition: background-position 0.15s ease-in-out
    }
    // TODO: use better logic  here or also in HTML template to avoid needing to specify 1,2,3,4
    li:nth-of-type(4n + 1){
        background-image: linear-gradient(to top right, var(--color-primary-1-bright), var(--color-primary-1-dark), var(--color-primary-1-bright));
        border-radius: 20px 20px 0 0;
        .inner {
            border-radius: 16.5px 16.5px 0 0;
        }
        @media screen and (min-width:571px) {
            border-radius: 20px 0 10px;
            .inner {
                border-radius: 16.5px 0 8.25px;
            }
        }
    }
    li:nth-of-type(4n + 2){
        background-image: linear-gradient(to top left, var(--color-primary-1-bright), var(--color-primary-1-dark), var(--color-primary-1-bright));
        @media screen and (min-width:571px) {
            border-radius:  0 20px 0 10px;
            .inner {
                border-radius:  0 16.5px 0 8.25px;
            }
        }
    }
    li:nth-of-type(4n + 3){
        background-image: linear-gradient(to top left, var(--color-primary-1-bright), var(--color-primary-1-dark), var(--color-primary-1-bright));
        @media screen and (min-width:571px) {
            border-radius:  0 10px 0 20px;
            .inner {
                border-radius:  0 8.25px 0 16.5px;
            }
        }
    }
    li:nth-of-type(4n + 4){
        background-image: linear-gradient(to top right, var(--color-primary-1-bright), var(--color-primary-1-dark), var(--color-primary-1-bright));
        border-radius:  0 0 20px 20px;
        .inner {
            border-radius:  0 0 16.5px 16.5px;
        }
        @media screen and (min-width:571px) {
            border-radius:  10px 0 20px;
            .inner {
                border-radius:  8.25px 0 16.5px;
            }
        }
    }
    .inner {
        background: var(--color-background-2);
        align-self: stretch;
        transition: background-color .15s ease-in-out;
    }
    p {
        padding: 0;
        margin: 0;
    }
    a {
        width: 100%;
        font-weight: bold;
        display: inline-block;
        border-bottom-width: 0;
    }
    .link-text {
        text-decoration: underline;

    }
    a:hover, a:focus {
        background: var(--color-background-1);
        cursor: pointer;
        
    }
    li:has(a:hover), li:has(a:focus) {
        background-position: 100% 0;
    }
    .title {
        color: var(--text-color);
        font-weight: normal;
        

    }
    h2 {
        font-size: 2rem;
        margin-block-start: 2em;
        margin-block-end: 1.5em;
        text-align: center;
    }
</style>
<section>
    <h2>Work experience</h2>
    <ol class="g2">
        {#each featuredWork as feature}
        <li class="fx">
            <a href="{feature.fields.url}" class="inner p1">
                <p><span class="link-text">{feature.fields.workPlaceName}</span><br />
                    <span class="ts-s title">{feature.fields.title}, {feature.fields.startDate.split('-')[0]}–{feature.fields.endDate ? feature.fields.endDate.split('-')[0] : 'present'}</span>
                </p>
            </a>
        </li>
        {/each}
    </ol>
</section>
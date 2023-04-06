<script>
	import Name from '$components/Name.svelte';
	import Sprite from "$components/Sprite.svelte";
</script>

<header class="fx jc-sb ai-c">
	<div class="header-side header-side--left fx as-s ai-s">
		<a class="back-link fx ai-c" href="/"> <span>Work stuff</span></a>
	</div>
	
	<div class="header-side fx pb0-5">
		<a rel="me" class="bw-0" title="Mastadon" href="https://indieweb.social/@ostermoster">
			<span class="vsh">Mastodon</span> <Sprite id="mastodon" offset={6} /></a>
		<div class="fx fd-c ai-c jc-sb pi1 inner">
			<Name />
			<span class="vsh">John Osterman</span>
		</div>
		<img
			class="pc-logo"
			width="113"
			height="113"
			src="/pc-logo-horizontal.svg"
			alt="Peace Corps logo: white dove on blue background with a red and white wave trailing behind"
		/>
	</div>
</header>

<style>
	@charset 'utf-8';
	header {
		border-top: 5px solid var(--color-secondary-1);
		border-bottom: 1px solid var(--color-primary-1);
		background-color: var(--color-background-2);
		padding-inline: 0 var(--padding);
		z-index: 2;
	}
	.header-side {
		flex: 0 1 260px;
	}
    .header-side--left {
        flex-shrink: 2;
    }
	.back-link {
		background-color: #767676;
		transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out;
		color: #fff;
		font-size: clamp(12px, 3.2vw, 1rem);
        padding-inline: clamp(10px, 3.125vw, 1rem);
	}
	.back-link:focus,
	.back-link:hover {
		border-bottom-width: 0;
		color: #fff;
		background-color: var(--color-secondary-1);
	}
	.back-link::before {
		content: '\21E6\00a0\00a0';
	}
	.inner {
		width: 100%;
		max-width: 200px;
		box-sizing: content-box;
		line-height: 1;
	}
	.pc-logo {
		width: 25px;
	}
</style>

<script>
	import Name from '$components/Name.svelte';
	import Social from '../Social.svelte';
	import { base } from '$app/paths';
</script>

<header class="fx jc-sb ai-c">
	<div class="header-side fx as-s ai-s">
		<a class="back-link pi1 fx ai-c" href="/"> <span>Work stuff</span></a>
	</div>
	
	<div class="header-side fx pb0-5">
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
		flex: 0 0 260px;
	}
	.back-link {
		background-color: #767676;
		transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out;
		color: #fff;
		font-size: 1rem;
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

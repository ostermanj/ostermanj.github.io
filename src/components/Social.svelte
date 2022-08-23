<script>
	import Sprite from '$components/Sprite.svelte';
</script>

<style>
	ul {
		width: 170px;
		margin-bottom: 22px;
	}
	:global(body.dark) ul {
		opacity: 0.8;
	}
</style>

<p class="vsh">Follow me on:</p>
<ul class="fx ai-c lns li-inline jc-sb">
	<li>
		<a class="bw-0" title="GitHub" href="//github.com/ostermanj"
			><span class="vsh">Github</span> <Sprite id="github" /></a
		>
	</li>
	<li>
		<a class="bw-0" title="Twitter" href="//twitter.com/JohnAOsterman"
			><span class="vsh">Twitter</span> <Sprite id="twitter" /></a
		>
	</li>
	<li>
		<a class="bw-0" title="LinkedIn" href="//www.linkedin.com/in/john-osterman-32714012/"
			><span class="vsh">LinkedIn</span> <Sprite id="linkedin" /></a
		>
	</li>
	<li><a sveltekit:reload class="bw-0" title="RSS" href="/rss"><span class="vsh">RSS</span> <Sprite width="{18}" height="{18}" id="rss" /></a></li>
</ul>


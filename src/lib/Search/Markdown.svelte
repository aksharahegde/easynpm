<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';

	export let source = '';
</script>

<article class="prose dark:prose-invert">
	<SvelteMarkdown {source} />
</article>

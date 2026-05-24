<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';

	export let source = '';
</script>

<article
	class="prose prose-sm break-words dark:prose-invert sm:prose-base max-w-none prose-pre:overflow-x-auto prose-img:max-w-full"
>
	<SvelteMarkdown {source} />
</article>

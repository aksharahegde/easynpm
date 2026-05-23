<script lang="ts">
	import type { Package } from '$lib/types/Results';

	export let row: Package;

	const linkItems = [
		{ key: 'homepage', label: 'Homepage', href: row.links?.homepage },
		{ key: 'repository', label: 'Repository', href: row.links?.repository },
		{ key: 'bugs', label: 'Bugs', href: row.links?.bugs },
		{ key: 'npm', label: 'NPM', href: row.links?.npm }
	].filter((item) => item.href);
</script>

{#if linkItems.length}
	<div class="my-2 flex flex-wrap items-center gap-2 md:my-0">
		{#each linkItems as item}
			<a
				href={item.href}
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-1 rounded border border-surface-border px-2 py-1 font-body-sm text-body-sm text-secondary transition-all duration-300 ease-smooth hover:border-primary/30 hover:text-primary dark:border-gray-600 dark:text-gray-400"
			>
				<span class="material-symbols-outlined text-sm">link</span>
				{item.label}
			</a>
		{/each}
	</div>
{/if}

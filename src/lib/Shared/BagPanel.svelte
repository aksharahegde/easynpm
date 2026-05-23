<script lang="ts">
	import { bagStore } from '$lib/stores/bag';
	import { notifications } from '$lib/stores/notifications';
	import CopyToClipboard from './CopyToClipboard.svelte';

	const { bag } = bagStore;

	const copyCommand = (manager: string) => {
		const packages = $bag.map((item) => `${item.name}@${item.version}`).join(' ');
		const val: string = `${manager} ${packages}`;
		const app = new CopyToClipboard({
			target: document.getElementById('clipboard')!,
			props: { val }
		});
		app.$destroy();
		notifications.success('Copied to clipboard', 1000);
	};
</script>

<div class="flex justify-between px-4 py-2 text-sm font-semibold text-on-surface dark:text-gray-100">
	<span>Bag</span>
	{#if $bag.length}
		<button
			type="button"
			class="material-symbols-outlined text-base cursor-pointer text-secondary hover:text-error dark:text-gray-400"
			aria-label="Clear bag"
			on:click={() => bagStore.clear()}
		>
			delete
		</button>
	{/if}
</div>

{#if $bag.length}
	<ul class="max-h-48 overflow-y-auto divide-y divide-surface-border dark:divide-gray-700">
		{#each $bag as item}
			<li class="px-4 py-2 text-sm text-on-surface dark:text-gray-200">
				{item.name} @ {item.version}
			</li>
		{/each}
	</ul>
{:else}
	<div class="flex items-center gap-2 px-4 py-3 text-sm text-slate-muted dark:text-gray-400">
		<span class="material-symbols-outlined text-base">info</span>
		<span>No packages in bag</span>
	</div>
{/if}

<div
	class="flex gap-2 justify-center p-2 border-t border-surface-border bg-surface-container-low dark:bg-gray-800 dark:border-gray-700"
>
	{#if !$bag.length}
		<a
			href="/search"
			class="w-full py-2 text-center text-sm font-medium text-primary hover:underline"
		>
			Search
		</a>
	{:else}
		<button
			type="button"
			class="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium border border-primary text-primary rounded hover:bg-primary-fixed transition-colors"
			on:click={() => copyCommand('yarn add')}
		>
			<span class="material-symbols-outlined text-base">content_copy</span>
			Yarn
		</button>
		<button
			type="button"
			class="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium border border-primary text-primary rounded hover:bg-primary-fixed transition-colors"
			on:click={() => copyCommand('npm install')}
		>
			<span class="material-symbols-outlined text-base">content_copy</span>
			NPM
		</button>
	{/if}
</div>

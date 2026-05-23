<script lang="ts">
	import { bagStore } from '$lib/stores/bag';
	import { Dropdown } from 'flowbite-svelte';
	import BagPanel from './BagPanel.svelte';

	export let triggerId = 'bag-trigger';
	export let testId = 'nav-bag-open';
	export let buttonClass =
		'p-2 hover:bg-surface-container rounded-lg transition-all active:scale-95 duration-100 ease-in-out relative';

	const { bag } = bagStore;
</script>

<button
	type="button"
	id={triggerId}
	data-testid={testId}
	class={buttonClass}
	aria-label="Open bag"
>
	<span class="material-symbols-outlined text-secondary dark:text-gray-400">shopping_bag</span>
	{#if $bag.length}
		<span
			class="absolute -top-1 -right-1 bg-primary text-on-primary text-xs font-bold min-w-[1.25rem] h-5 px-1 rounded-full border-2 border-surface flex items-center justify-center"
		>
			{$bag.length}
		</span>
	{/if}
</button>

<Dropdown
	triggeredBy={'#' + triggerId}
	class="w-full max-w-sm rounded-xl divide-y-0 shadow-lg border border-surface-border dark:bg-gray-800 dark:border-gray-700 overflow-hidden"
>
	<BagPanel />
</Dropdown>

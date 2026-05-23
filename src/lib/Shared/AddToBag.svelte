<script lang="ts">
	import type { Package } from '$lib/types/Results';
	import { bagStore } from '$lib/stores/bag';
	import { notifications } from '$lib/stores/notifications';

	export let row: Package;
	export let compact = false;
	export let iconOnly = false;

	$: showIconOnly = iconOnly || compact;

	const addToBag = () => {
		bagStore.add(row);
		notifications.success('Added to bag', 1000);
	};
</script>

<button
	type="button"
	class="interactive-press inline-flex items-center gap-1 rounded-md border border-primary text-primary transition-all duration-300 ease-smooth hover:bg-primary-fixed dark:hover:bg-primary/20 {showIconOnly
		? 'px-2 py-1'
		: 'rounded-lg px-3 py-2 font-label-caps text-label-caps'}"
	on:click={addToBag}
>
	<span class="material-symbols-outlined {showIconOnly ? 'text-[16px]' : 'text-base'}"
		>shopping_bag</span
	>
	{#if !showIconOnly}
		<span>Add to bag</span>
	{/if}
</button>

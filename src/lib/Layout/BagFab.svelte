<script lang="ts">
	import { bagStore } from '$lib/stores/bag';

	const { bag } = bagStore;

	function openBag() {
		document.getElementById('bag-trigger')?.click();
	}
</script>

<button
	type="button"
	data-testid="bag-fab-open"
	class="fixed bottom-8 right-8 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-on-primary shadow-lg transition-all hover:bg-accent-orange-hover active:scale-90 group"
	aria-label="Open bag"
	on:click={openBag}
>
	<span class="material-symbols-outlined">shopping_bag</span>
	<span
		class="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-primary bg-surface-container-lowest text-xs font-bold text-primary"
	>
		{$bag.length}
	</span>
</button>

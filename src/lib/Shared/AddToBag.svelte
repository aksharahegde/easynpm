<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { BagSolid } from 'flowbite-svelte-icons';
	import { bagStore } from '$lib/stores/bag';
	import { notifications } from '$lib/stores/notifications';

    export let row: Package;
	const addToBag = (packageDetails: any) => {
		bagStore.add(packageDetails);
        notifications.success('Added to bag', 1000)
	};
</script>

<Button class="!p-2" id="placement-add_to_bag" on:click|once={() => addToBag(row)}>
	<BagSolid size="sm" />
	<span class="ml-1 md:hidden">Add to bag</span>
</Button>

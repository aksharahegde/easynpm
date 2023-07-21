<script lang="ts">
	import { BagSolid, CopySolid, InfoCircleSolid, TrashBinSolid } from 'flowbite-svelte-icons';
	import CopyToClipboard from './CopyToClipboard.svelte';

	import { bagStore } from '$lib/stores/bag';
	import { A, Button, Dropdown, DropdownItem } from 'flowbite-svelte';
	import { notifications } from '$lib/stores/notifications';

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

<div
	id="bell"
	class="inline-flex items-center text-sm font-medium text-center text-gray-500 cursor-pointer hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400"
>
	<BagSolid size="sm" class="text-base outline-none" />
	{#if $bag.length}
		<div class="flex relative">
			<div
				class="inline-flex relative -top-2 right-3 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"
			/>
		</div>
	{/if}
</div>
<Dropdown
	triggeredBy="#bell"
	class="w-full max-w-sm rounded divide-y divide-gray-100 shadow dark:bg-gray-800 dark:divide-gray-700"
>
	<div slot="header" class="flex justify-between px-4 py-2 text-sm font-semibold">
		Bag
		{#if $bag.length}
			<TrashBinSolid size="sm" class="text-base cursor-pointer" on:click={() => bagStore.clear()} />
		{/if}
	</div>
	{#each $bag as item}
		<DropdownItem class="flex space-x-4 cursor-default">
			{item.name} @ {item.version}
		</DropdownItem>
	{/each}
	{#if !$bag.length}
		<DropdownItem class="flex space-x-4 cursor-default">
			<InfoCircleSolid size="sm" class="text-base" />
			<span> No packages in bag </span>
		</DropdownItem>
	{/if}

	<div
		slot="footer"
		class="flex gap-2 justify-center p-2 -my-1 text-sm font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
	>
		{#if !$bag.length}
			<div class="inline-flex items-center">
				<A href="/search" class="w-full text-center">Search</A>
			</div>
		{:else}
			<Button
				size="sm"
				color="dark"
				class="inline-flex items-center cursor-pointer"
				on:click={() => copyCommand('yarn add')}
			>
				<CopySolid size="sm" class="mr-1 text-base" />
				<span> Yarn </span>
			</Button>
			<Button
				size="sm"
				color="dark"
				class="inline-flex items-center cursor-pointer"
				on:click={() => copyCommand('npm install')}
			>
				<CopySolid size="sm" class="mr-1 text-base" />
				<span> NPM </span>
			</Button>
		{/if}
	</div>
</Dropdown>

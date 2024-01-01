<script lang="ts">
	import { Drawer, CloseButton, Spinner } from 'flowbite-svelte';
	import { sineIn } from 'svelte/easing';
	import { onMount, createEventDispatcher } from 'svelte';
	import Markdown from './Markdown.svelte';
	import Links from '$lib/Shared/Links.svelte';
	import LastUpdated from '$lib/Shared/LastUpdated.svelte';
	import AddToBag from '$lib/Shared/AddToBag.svelte';
	import Commands from '$lib/Shared/Commands.svelte';

	export let selectedPackage: Package;
	let loading = false;
	let result: any;
	let hidden = false;
	let transitionParamsRight = {
		x: 320,
		duration: 200,
		easing: sineIn
	};
	onMount(() => {
		fetchDetails();
		history.pushState('', selectedPackage.name, `/${selectedPackage.name}`);
	});
	async function fetchDetails() {
		loading = true;
		let url = `https://registry.npmjs.com/${selectedPackage.name}`;
		const res = await fetch(url);
		result = await res.json();
		result.distTags = Object.entries(result['dist-tags']).map(([name, value]) => ({ name, value }));
		loading = false;
	}
	const dispatch = createEventDispatcher();
	const drawerClosed = () => {
		console.log('closed');
		history.back()
		dispatch('closed', {
			text: 'Closed!'
		});
	};
</script>

<Drawer
	placement="right"
	transitionType="fly"
	transitionParams={transitionParamsRight}
	bind:hidden
	on:hide={drawerClosed}
	id="sidebar"
>
	<div class="flex items-center">
		{#if result && !loading}
			<div class="hidden flex-wrap gap-4 items-center py-2 text-left md:flex">
				<AddToBag row={selectedPackage} />
				<Commands row={selectedPackage} />
			</div>
		{/if}

		<CloseButton on:click={() => (hidden = true)} class="mb-4 dark:text-white" />
	</div>
	{#if loading}
		<div class="py-12">
			<Spinner size="24" />
		</div>
	{:else if result}
		<div class="py-4 text-left">
			<h2 class="flex text-4xl font-semibold text-gray-800 dark:text-gray-100">
				{selectedPackage.name}
			</h2>
			<p class="my-2 max-w-sm text-gray-600 md:max-w-4xl dark:text-gray-300">
				{result.description}
			</p>
			<div class="flex flex-col px-4 py-2">
				<div class="text-sm font-semibold text-gray-600 dark:text-gray-500">Version</div>
				<div class="flex gap-3">
					{#each result.distTags as tag}
						<div class="px-3 py-2 bg-gray-100 dark:bg-slate-800">
							<div class="text-sm text-gray-500 dark:text-gray-300">
								{tag.name}
							</div>
							<div class="text-gray-600 dark:text-gray-200">
								{tag.value}
							</div>
						</div>
					{/each}
				</div>
			</div>
			<div class="flex gap-2 py-2 flex-cold md:flex-row">
				<LastUpdated value={selectedPackage.date} />
				<Links row={selectedPackage} />
			</div>
		</div>
		<div class="py-2 text-left markdown-block">
			<Markdown source={result.readme} />
		</div>
	{/if}
</Drawer>

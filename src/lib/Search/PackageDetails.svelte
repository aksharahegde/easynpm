<script lang="ts">
	import type { Package } from '$lib/types/Results';
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
	let result: {
		description?: string;
		readme?: string;
		distTags: { name: string; value: string }[];
	};
	let hidden = false;
	const transitionParamsRight = {
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
		const url = `https://registry.npmjs.com/${selectedPackage.name}`;
		const res = await fetch(url);
		const data = await res.json();
		result = {
			...data,
			distTags: Object.entries(data['dist-tags'] ?? {}).map(([name, value]) => ({
				name,
				value: String(value)
			}))
		};
		loading = false;
	}

	const dispatch = createEventDispatcher();

	const drawerClosed = () => {
		history.back();
		dispatch('closed');
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
	<div class="flex items-start justify-between gap-stack-sm border-b border-surface-border pb-stack-md dark:border-gray-700">
		{#if result && !loading}
			<div class="hidden flex-wrap items-center gap-stack-sm md:flex">
				<AddToBag row={selectedPackage} />
			</div>
		{/if}
		<CloseButton
			on:click={() => (hidden = true)}
			class="ml-auto text-slate-muted hover:text-primary dark:text-gray-400"
		/>
	</div>

	{#if loading}
		<div class="flex justify-center py-12">
			<Spinner size="8" color="primary" />
		</div>
	{:else if result}
		<div class="py-stack-md text-left">
			<h2 class="font-headline-lg text-headline-lg text-slate-text dark:text-gray-100">
				{selectedPackage.name}
			</h2>
			<p class="my-stack-sm max-w-4xl font-body-md text-body-md text-slate-muted dark:text-gray-400">
				{result.description}
			</p>

			<div class="mb-stack-md md:hidden">
				<AddToBag row={selectedPackage} />
			</div>

			<div class="mb-stack-md">
				<Commands row={selectedPackage} />
			</div>

			<div class="mb-stack-md">
				<div class="mb-stack-sm font-label-caps text-label-caps text-slate-muted">Versions</div>
				<div class="flex flex-wrap gap-2">
					{#each result.distTags as tag}
						<div
							class="rounded border border-surface-border bg-surface-container px-3 py-2 dark:border-gray-600 dark:bg-gray-900"
						>
							<div class="text-xs text-slate-muted dark:text-gray-400">{tag.name}</div>
							<div class="font-code-snippet text-body-sm text-slate-text dark:text-gray-200">
								{tag.value}
							</div>
						</div>
					{/each}
				</div>
			</div>

			<div class="flex flex-col gap-stack-sm border-t border-surface-border pt-stack-md dark:border-gray-700">
				<LastUpdated value={selectedPackage.date} />
				<Links row={selectedPackage} />
			</div>
		</div>
		<div class="markdown-block border-t border-surface-border py-stack-md text-left dark:border-gray-700">
			<Markdown source={result.readme} />
		</div>
	{/if}
</Drawer>

<script lang="ts">
	import {
		Button,
		Badge,
		Progressbar,
		Indicator,
		Listgroup,
		ListgroupItem,
		Toast,
		Tooltip
	} from 'flowbite-svelte';
	import { formatDistance } from 'date-fns';
	import { slide } from 'svelte/transition';
	import { BagSolid, CheckCircleSolid, CopySolid, EyeSolid } from 'flowbite-svelte-icons';
	import { bagStore } from '$lib/stores/bag';
	import CopyToClipboard from './CopyToClipboard.svelte';

	export let payload: Payload;
	export let result: SearchResult;
	let placement: string | null = null;
	let toggledIndex: number | null = null;
	let loading = false;
	let isToastOpen = false;
	let toastMessage = '';
	const packageManagers = ['yarn add', 'npm install', 'pnpm install'];

	const lastUpdatedDuration = (value: string) => formatDistance(new Date(value), new Date());
	const toggleMenu = (index: any) => {
		toggledIndex = index;
	};
	const displayText = (e: any) => {
		[, placement] = e?.target?.id.split('-');
	};
	const copyCommand = (packageDetails: any) => {
		const val: string = `${packageDetails.package.name}@${packageDetails.package.version}`;
		const app = new CopyToClipboard({
			target: document.getElementById('clipboard')!,
			props: { val }
		});
		app.$destroy();
		console.log('copied!');
		showToast('Command copied to clipboard!');
	};
	const addToBag = (packageDetails: any) => {
		bagStore.add(packageDetails);
		console.log('added to bag');
		showToast('Package added to bag!');
	};
	const showToast = (message: string) => {
		toastMessage = message;
		isToastOpen = true;
		setTimeout(() => {
			isToastOpen = false;
		}, 3000);
	};
	const loadMore = async () => {
		loading = true;
		const queryParams = `from=${result.objects.length}&text=${payload.keyword}&quality=${payload.quality}&popularity=${payload.popularity}&maintenance=${payload.maintenance}`;
		let url = `https://registry.npmjs.com/-/v1/search?${queryParams}`;
		const res = await fetch(url);
		const data = await res.json();
		loading = false;
		result.objects = result.objects.concat(data.objects);
	};
</script>

<div id="clipboard" />

<Toast transition={slide} position="top-right" class="mb-4" open={isToastOpen}>
	<CheckCircleSolid size="lg" slot="icon" />
	<span class="text-gray-300">{toastMessage}</span>
</Toast>

{#if result}
	<div class="flex gap-2 justify-end items-center pt-4 text-sm text-gray-400">
		Showing {result.objects.length} of {result.total} results
	</div>
{/if}

<Listgroup active class="mt-4">
	{#if result}
		{#each result.objects as row, i}
			<ListgroupItem
				class="relative flex-col gap-2 justify-between w-full md:flex-row"
				on:mouseenter={() => toggleMenu(i)}
				on:mouseleave={() => toggleMenu(null)}
			>
				<div class="w-full md:w-3/4">
					<div class="flex gap-4 text-lg font-semibold md:justify-between text-primary-600">
						{row.package.name}
						<Badge border color="primary">
							v{row.package.version}
						</Badge>
					</div>
					{#if row.package.description}
						<p class="mt-2 font-normal text-gray-500 dark:text-gray-300 md:mt-0">{row.package.description}</p>
					{/if}
				</div>
				<div class="w-full md:w-1/4">
					<div class="hidden md:block">
						<div class="flex gap-1 items-center">
							<Progressbar progress={(row.score.final * 100).toString()} color="primary" />
							<Indicator color="orange" size="xl" border>
								<span class="text-xs text-white"
									>{parseInt((row.score.final * 100).toString())}</span
								>
							</Indicator>
						</div>
						<span>Last updated: {lastUpdatedDuration(row.package.date)} ago</span>
					</div>
					<div
						class="{toggledIndex === i ? 'md:flex' : 'md:hidden'} flex md:absolute inset-0 z-10 gap-2 justify-between items-center md:p-4 bg-gray-800 rounded-lg"
					>
						<div class="hidden gap-2 items-center px-4 md:flex">
							{#each packageManagers as manager}
								<Button color="dark" size="sm" light on:click={() => copyCommand(row)}>
									{manager} {row.package.name}@{row.package.version}</Button
								>
							{/each}
						</div>
						<div>
							<Button
								class="!p-2"
								id="placement-view"
								href={row.package.links?.homepage}
								target="_blank"
							>
								<EyeSolid size="sm" />
							</Button>
							<Button class="!p-2" id="placement-copy" on:click|once={() => copyCommand(row)}>
								<CopySolid size="sm" />
							</Button>
							<Button class="!p-2" id="placement-bag" on:click|once={() => addToBag(row)}>
								<BagSolid size="sm" />
							</Button>
							<Tooltip
								triggeredBy="[id^='placement-']"
								placement="bottom"
								arrow={false}
								on:show={displayText}
							>
								<span class="text-xs capitalize">{placement}</span>
							</Tooltip>
						</div>
					</div>
				</div>
			</ListgroupItem>
		{/each}
		{#if result.total > 20}
			<Button
				on:click={loadMore}
				class="flex justify-center items-center p-3 w-full text-sm font-medium bg-gray-50 rounded-t-none rounded-b-lg text-primary-600 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-primary-500"
			>
				View more
			</Button>
		{/if}
	{/if}
</Listgroup>

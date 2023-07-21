<script lang="ts">
	import {
		Button,
		Badge,
		Progressbar,
		Indicator,
		Listgroup,
		ListgroupItem,
		Toast,
		Tooltip,
		Toggle
	} from 'flowbite-svelte';
	import { formatDistance } from 'date-fns';
	import { slide } from 'svelte/transition';
	import { BagSolid, CheckCircleSolid, EyeSolid, LinkSolid } from 'flowbite-svelte-icons';
	import { bagStore } from '$lib/stores/bag';
	import CopyToClipboard from '../Shared/CopyToClipboard.svelte';

	export let payload: Payload;
	export let result: SearchResult;
	let placement: string | null = null;
	let toggledIndex: number | null = null;
	let loading = false;
	let isToastOpen = false;
	let showLinks = false;
	let toastMessage = '';
	const packageManagers = ['yarn add', 'npm install', 'pnpm install'];

	const lastUpdatedDuration = (value: string) => formatDistance(new Date(value), new Date());
	const toggleMenu = (index: any) => {
		toggledIndex = index;
	};
	const displayText = (e: any) => {
		placement = e?.target?.id.replace('placement-', '').replaceAll('_', ' ');
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
		let queryParams = `text=${payload.keyword}`;
		if (payload.quality) {
			queryParams += `&quality=${payload.quality / 100}`;
		}
		if (payload.popularity) {
			queryParams += `&popularity=${payload.popularity / 100}`;
		}
		if (payload.maintenance) {
			queryParams += `&maintenance=${payload.maintenance / 100}`;
		}

		let url = `https://registry.npmjs.com/-/v1/search?${queryParams}`;
		const res = await fetch(url);
		const data = await res.json();
		loading = false;
		result.objects = result.objects.concat(data.objects);
	};
</script>

<div id="clipboard" />

<Toast transition={slide} position="top-right" class="fixed top-20 z-10 mb-4" open={isToastOpen}>
	<CheckCircleSolid size="lg" slot="icon" />
	<span class="dark:text-gray-300">{toastMessage}</span>
</Toast>
{#if result}
	<div class="flex gap-2 justify-between items-center pt-4">
		<Toggle
			checked={showLinks}
			class="cursor-pointer"
			value="Relaxed mode"
			size="small"
			on:click={() => (showLinks = !showLinks)}>Show links</Toggle
		>
		<span class="text-sm text-gray-400">
			Showing {result.objects.length} of {result.total} results
		</span>
	</div>
{/if}

<Listgroup active class="mt-4">
	{#if result}
		{#each result.objects as row, i}
			<ListgroupItem
				class="flex-col gap-2 justify-between w-full"
				on:mouseenter={() => toggleMenu(i)}
				on:mouseleave={() => toggleMenu(null)}
			>
				<div class="flex relative flex-col gap-2 justify-between w-full md:flex-row">
					<div class="w-full md:w-3/4">
						<div class="flex gap-1 items-center">
							<span class="text-lg font-semibold text-primary-600">{row.package.name}</span>
							<span class="text-xs dark:text-gray-300">v{row.package.version}</span>
						</div>
						{#if row.package.description}
							<p class="mt-2 font-normal text-gray-500 dark:text-gray-300 md:mt-0">
								{row.package.description}
							</p>
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
							class="{toggledIndex === i
								? 'md:flex'
								: 'md:hidden'} flex md:absolute inset-0 z-10 gap-2 justify-between items-center md:p-4 md:bg-gray-800 dark:bg-gray-800 rounded-lg"
						>
							<div class="hidden gap-2 items-center px-4 md:flex">
								{#each packageManagers as manager}
									<Button color="dark" size="sm" light on:click={() => copyCommand(row)}>
										<span class="text-xs">{manager} {row.package.name}@{row.package.version}</span
										></Button
									>
								{/each}
							</div>
							<div class="grid grid-cols-2 gap-2">
								<Button
									class="!p-2"
									id="placement-view"
									href={row.package.links?.homepage}
									target="_blank"
								>
									<EyeSolid size="sm" />
									<span class="ml-1 md:hidden">View</span>
								</Button>
								<Button class="!p-2" id="placement-add_to_bag" on:click|once={() => addToBag(row)}>
									<BagSolid size="sm" />
									<span class="ml-1 md:hidden">Add to bag</span>
								</Button>
								<Tooltip
									triggeredBy="[id^='placement-']"
									placement="bottom"
									arrow={false}
									on:show={displayText}
								>
									<span class="text-xs capitalize whitespace-nowrap">{placement}</span>
								</Tooltip>
							</div>
						</div>
					</div>
				</div>
				{#if showLinks}
					<div class="flex gap-2 justify-end items-center my-2 w-full md:my-0">
						<Badge href={row.package.links?.homepage} color="indigo" target="_blank">
							<LinkSolid size="sm" class="mr-1 w-3" />
							Homepage
						</Badge>
						<Badge href={row.package.links?.repository} color="indigo" target="_blank">
							<LinkSolid size="sm" class="mr-1 w-3" />
							Repository</Badge
						>
						<Badge href={row.package.links?.bugs} color="indigo" target="_blank">
							<LinkSolid size="sm" class="mr-1 w-3" />
							Bugs</Badge
						>
						<Badge href={row.package.links?.npm} color="indigo" target="_blank">
							<LinkSolid size="sm" class="mr-1 w-3" />
							NPM</Badge
						>
					</div>
				{/if}
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

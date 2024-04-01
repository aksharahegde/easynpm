<script lang="ts">
	import {
		Button,
		Progressbar,
		Indicator,
		Listgroup,
		ListgroupItem,
		Tooltip,
		Toggle
	} from 'flowbite-svelte';
	import { EyeSolid } from 'flowbite-svelte-icons';
	import PackageDetails from './PackageDetails.svelte';
	import Links from '$lib/Shared/Links.svelte';
	import LastUpdated from '$lib/Shared/LastUpdated.svelte';
	import AddToBag from '$lib/Shared/AddToBag.svelte';
	import Commands from '$lib/Shared/Commands.svelte';
	import Toastr from '$lib/Shared/Toastr.svelte';

	export let payload: Payload;
	export let result: SearchResult;
	let placement: string | null = null;
	let toggledIndex: number | null = null;
	let loading = false;
	let showLinks = false;
	let selectedPackage: Package;
	let isDetailsOpen: boolean = false;
	let offset: number = 20;

	const toggleMenu = (index: any) => {
		toggledIndex = index;
	};
	const displayText = (e: any) => {
		placement = e?.target?.id.replace('placement-', '').replaceAll('_', ' ');
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

		if (offset > 0) {
			queryParams += `&from=${offset}`;
		}

		let url = `https://registry.npmjs.com/-/v1/search?${queryParams}`;
		const res = await fetch(url);
		const data = await res.json();
		loading = false;
		result.objects = result.objects.concat(data.objects);
		offset += data.objects.length;
	};

	const togglePackageDetails = (row: Package) => {
		isDetailsOpen = false;
		setTimeout(() => {
			isDetailsOpen = true;
		}, 100);
		selectedPackage = row;
	};
</script>

<div id="clipboard" />

{#if isDetailsOpen}
	<PackageDetails {selectedPackage} on:closed={() => (isDetailsOpen = false)} />
{/if}

<Toastr />
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
						<button class="flex gap-1 items-center" on:click|once={() => togglePackageDetails(row.package)}>
							<span class="text-lg font-semibold text-primary-600">{row.package.name}</span>
							<span class="text-xs dark:text-gray-300">v{row.package.version}</span>
						</button>
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
							<LastUpdated value={row.package.date} />
						</div>
						<div
							class="{toggledIndex === i
								? 'md:flex'
								: 'md:hidden'} flex md:absolute left-1/4 top-0 bottom-0 right-0 z-10 gap-2 justify-between items-center md:p-4 md:bg-gray-300 dark:bg-gray-800 rounded-lg"
						>
							<div class="hidden gap-2 items-center px-4 md:flex">
								<Commands row={row.package} />
							</div>
							<div class="grid grid-cols-2 gap-2">
								<Button
									class="!p-2"
									id="placement-view"
									on:click|once={() => togglePackageDetails(row.package)}
								>
									<EyeSolid size="sm" />
									<span class="ml-1 md:hidden">View</span>
								</Button>
								<AddToBag row={row.package} />
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
					<Links row={row.package} />
				{/if}
			</ListgroupItem>
		{/each}
		{#if result.total > 20 && !loading}
			<Button
				on:click={loadMore}
				class="flex justify-center items-center p-3 w-full text-sm font-medium bg-gray-50 rounded-t-none rounded-b-lg text-primary-600 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-primary-500"
			>
				View more
			</Button>
		{/if}
	{/if}
</Listgroup>

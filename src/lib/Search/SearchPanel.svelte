<script lang="ts">
	import {
		Accordion,
		AccordionItem,
		Alert,
		Button,
		Indicator,
		Label,
		ListPlaceholder,
		Range,
		Search
	} from 'flowbite-svelte';
	import { ArrowRightSolid, CloseSolid, CogOutline, InfoCircleSolid } from 'flowbite-svelte-icons';
	import SearchResult from './SearchResult.svelte';

	let showAdvancedFilters: boolean = false;
	let appliedFilterCount: number = 0;
	let timer: any;
	let loading = false;
	let noResults = false;
	let result: SearchResult;
	let payload: Payload = {
		keyword: '',
		quality: 0,
		popularity: 0,
		maintenance: 0
	};
	const fetchSearchResults = (e: any) => {
		clearTimeout(timer);
		payload.keyword = e.target.value;
		timer = setTimeout(() => {
			if (payload.keyword) {
				loading = true;
				noResults = false;
				fetchResults();
			} else {
				result.objects = [];
			}
		}, 750);
	};

	async function fetchResults() {
		setAppliedFilterCount();
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
		result = await res.json();
		noResults = !result.objects.length;
		loading = false;
	}
	const setAppliedFilterCount = () => {
		appliedFilterCount = 0;
		if (payload.quality) {
			appliedFilterCount++;
		}
		if (payload.popularity) {
			appliedFilterCount++;
		}
		if (payload.maintenance) {
			appliedFilterCount++;
		}
	};
	const clearFilters = () => {
		showAdvancedFilters = false;
		payload.quality = 0;
		payload.popularity = 0;
		payload.maintenance = 0;
		appliedFilterCount = 0;
	};
</script>

<div class="gap-4">
	<div class="flex gap-4 items-center">
		<Search size="lg" on:input={fetchSearchResults} class="md:py-3" placeholder="Start typing a package name" />
		<Button
			color="primary"
			class="!p-2.5 relative"
			size="lg"
			on:click={() => (showAdvancedFilters = !showAdvancedFilters)}
		>

			<CogOutline/>
			<Indicator color="dark" border size="xl" placement="top-right">
				<span class="text-xs font-bold text-white">{appliedFilterCount}</span>
			</Indicator>
		</Button>
	</div>
	{#if showAdvancedFilters}
		<Accordion class="mt-4">
			<AccordionItem
				paddingDefault="p-3"
				defaultClass="flex items-center justify-between w-full font-medium rounded-lg text-left border-gray-200 dark:border-gray-700"
			>
				<span slot="header" class="text-sm">Advanced options</span>
				<div class="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
					<div class="text-left">
						<Label>Quality [{payload.quality}%]</Label>
						<Range id="quality" min="0" max="100" bind:value={payload.quality} />
					</div>
					<div class="text-left">
						<Label>Popularity [{payload.popularity}%]</Label>
						<Range id="popularity" min="0" max="100" bind:value={payload.popularity} />
					</div>
					<div class="text-left">
						<Label>Maintenance [{payload.maintenance}%]</Label>
						<Range id="maintenance" min="0" max="100" bind:value={payload.maintenance} />
					</div>
				</div>
				<div class="flex gap-2 justify-end mt-4">
					<Button color="dark" on:click={clearFilters} class="mr-2 dark:text-primary-700 dark:hover:text-primary-600">
						<CloseSolid size="xs" class="mr-2" />
						Clear & Close
					</Button>
					<Button color="primary" on:click={fetchResults} class="mr-2">
						<ArrowRightSolid size="xs" class="mr-2" />
						Apply Filters
					</Button>
				</div>
			</AccordionItem>
		</Accordion>
	{/if}

	{#if loading}
		<ListPlaceholder class="mt-4 w-full max-w-full rounded-lg" />
	{:else if noResults && payload.keyword && !loading}
		<Alert color="red">
			<InfoCircleSolid size="sm" slot="icon" />
			No results found for "{payload.keyword}". Please check with relative keywords.
		</Alert>
	{:else if result?.objects.length}
		<SearchResult {result} {payload} />
	{:else}
		<Alert color="dark" border class="mt-4">
			<InfoCircleSolid size="sm" slot="icon" />
			Please enter a package name to get started.
		</Alert>
	{/if}
</div>

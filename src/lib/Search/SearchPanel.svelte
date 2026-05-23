<script lang="ts">
	import { page } from '$app/stores';
	import type { Payload, SearchResult } from '$lib/types/Results';
	import {
		Accordion,
		AccordionItem,
		Button,
		Label,
		Range
	} from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import SearchResultList from './SearchResult.svelte';

	let showAdvancedFilters = false;
	let appliedFilterCount = 0;
	let timer: ReturnType<typeof setTimeout> | undefined;
	let loading = false;
	let noResults = false;
	let result: SearchResult | undefined;
	let searchInputValue = '';
	let payload: Payload = {
		keyword: '',
		quality: 0,
		popularity: 0,
		maintenance: 0
	};

	const fetchSearchResults = (e: Event) => {
		const target = e.target as HTMLInputElement;
		clearTimeout(timer);
		payload.keyword = target.value;
		searchInputValue = target.value;
		timer = setTimeout(() => {
			if (payload.keyword) {
				loading = true;
				noResults = false;
				fetchResults();
			} else {
				result = undefined;
				loading = false;
			}
		}, 750);
	};

	onMount(() => {
		const initialQuery = $page.url.searchParams.get('q');
		if (initialQuery) {
			payload.keyword = initialQuery;
			searchInputValue = initialQuery;
			loading = true;
			noResults = false;
			fetchResults();
		}
	});

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

		const url = `https://registry.npmjs.com/-/v1/search?${queryParams}`;
		const res = await fetch(url);
		const data: SearchResult = await res.json();
		result = data;
		noResults = !data.objects.length;
		loading = false;
	}

	const setAppliedFilterCount = () => {
		appliedFilterCount = 0;
		if (payload.quality) appliedFilterCount++;
		if (payload.popularity) appliedFilterCount++;
		if (payload.maintenance) appliedFilterCount++;
	};

	const clearFilters = () => {
		showAdvancedFilters = false;
		payload.quality = 0;
		payload.popularity = 0;
		payload.maintenance = 0;
		appliedFilterCount = 0;
		if (payload.keyword) {
			loading = true;
			fetchResults();
		}
	};
</script>

<div class="flex flex-col gap-stack-md">
	<div class="flex items-center gap-stack-sm">
		<div class="group relative flex-1">
			<div
				class="pointer-events-none absolute inset-y-0 left-4 flex items-center transition-transform duration-300 ease-smooth group-focus-within:scale-110"
			>
				<span
					class="material-symbols-outlined text-slate-muted transition-colors duration-300 group-focus-within:text-primary"
				>
					search
				</span>
			</div>
			<input
				id="search-input"
				data-testid="search-input"
				type="text"
				bind:value={searchInputValue}
				on:input={fetchSearchResults}
				placeholder="Search for packages (e.g., react, lodash, tailwind)..."
				class="w-full rounded-xl border border-surface-border bg-surface-container-lowest py-4 pl-14 pr-14 font-body-md text-body-md text-on-surface shadow-sm transition-all duration-300 ease-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:shadow-md dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
			/>
			<div class="pointer-events-none absolute inset-y-0 right-4 hidden items-center md:flex">
				<kbd
					class="inline-flex items-center gap-1 rounded border border-surface-border bg-surface-container px-2 py-1 font-code-snippet text-body-sm text-slate-muted dark:border-gray-600 dark:bg-gray-700"
				>
					<span class="text-xs">⌘</span>K
				</kbd>
			</div>
		</div>

		<button
			type="button"
			data-testid="search-filter-toggle"
			class="interactive-press relative flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-xl border border-surface-border bg-surface-container-lowest text-secondary transition-all duration-300 hover:border-primary/30 hover:text-primary dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400"
			aria-label="Toggle advanced filters"
			aria-expanded={showAdvancedFilters}
			on:click={() => (showAdvancedFilters = !showAdvancedFilters)}
		>
			<span class="material-symbols-outlined">tune</span>
			{#if appliedFilterCount > 0}
				<span
					class="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-primary px-1 text-xs font-bold text-on-primary"
				>
					{appliedFilterCount}
				</span>
			{/if}
		</button>
	</div>

	{#if showAdvancedFilters}
		<div
			class="rounded-xl border border-surface-border bg-surface-container-low p-stack-md dark:border-gray-700 dark:bg-gray-800"
		>
			<Accordion>
				<AccordionItem
					open
					paddingDefault="p-3"
					defaultClass="flex w-full items-center justify-between rounded-lg border-0 text-left font-medium text-slate-text dark:text-gray-100"
				>
					<span slot="header" class="font-body-sm text-body-sm font-semibold">Advanced options</span>
					<div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
						<div class="text-left">
							<Label class="text-slate-text dark:text-gray-200"
								>Quality [{payload.quality}%]</Label
							>
							<Range id="quality" min="0" max="100" bind:value={payload.quality} />
						</div>
						<div class="text-left">
							<Label class="text-slate-text dark:text-gray-200"
								>Popularity [{payload.popularity}%]</Label
							>
							<Range id="popularity" min="0" max="100" bind:value={payload.popularity} />
						</div>
						<div class="text-left">
							<Label class="text-slate-text dark:text-gray-200"
								>Maintenance [{payload.maintenance}%]</Label
							>
							<Range id="maintenance" min="0" max="100" bind:value={payload.maintenance} />
						</div>
					</div>
					<div class="mt-4 flex flex-wrap justify-end gap-stack-sm">
						<Button color="dark" on:click={clearFilters} class="interactive-press">
							<span class="material-symbols-outlined mr-1 text-base">close</span>
							Clear & Close
						</Button>
						<Button color="primary" on:click={fetchResults} class="interactive-press">
							<span class="material-symbols-outlined mr-1 text-base">check</span>
							Apply Filters
						</Button>
					</div>
				</AccordionItem>
			</Accordion>
		</div>
	{/if}

	{#if loading}
		<div class="mt-stack-md flex flex-col gap-gutter" aria-busy="true" aria-label="Loading results">
			{#each Array(4) as _}
				<div
					class="animate-pulse rounded-xl border border-surface-border bg-surface-container-lowest p-stack-md dark:border-gray-700 dark:bg-gray-800"
				>
					<div class="mb-4 h-6 w-1/3 rounded bg-surface-container dark:bg-gray-700"></div>
					<div class="mb-3 h-4 w-2/3 rounded bg-surface-container dark:bg-gray-700"></div>
					<div class="h-12 rounded bg-code-bg dark:bg-gray-900"></div>
				</div>
			{/each}
		</div>
	{:else if noResults && payload.keyword}
		<div
			class="mt-stack-md flex items-start gap-stack-sm rounded-xl border border-surface-border bg-error-container/30 p-stack-md dark:border-gray-700 dark:bg-red-900/20"
			role="alert"
		>
			<span class="material-symbols-outlined text-error">search_off</span>
			<div>
				<p class="font-body-md text-body-md font-semibold text-on-error-container dark:text-red-200">
					No results found for "{payload.keyword}"
				</p>
				<p class="mt-1 font-body-sm text-body-sm text-slate-muted dark:text-gray-400">
					Try different keywords or adjust advanced filters.
				</p>
			</div>
		</div>
	{:else if result?.objects.length}
		{#key payload.keyword}
			<SearchResultList {result} {payload} />
		{/key}
	{:else}
		<div
			class="mt-stack-md flex flex-col items-center gap-stack-md rounded-xl border border-surface-border bg-surface-container-low p-stack-lg text-center dark:border-gray-700 dark:bg-gray-800 md:flex-row md:text-left"
		>
			<span class="material-symbols-outlined text-5xl text-primary">package_2</span>
			<div>
				<h2 class="font-headline-lg text-headline-lg text-slate-text dark:text-gray-100">
					Start searching
				</h2>
				<p class="mt-2 font-body-md text-body-md text-slate-muted dark:text-gray-400">
					Enter a package name to discover npm packages with scores, install commands, and more.
				</p>
			</div>
		</div>
	{/if}
</div>

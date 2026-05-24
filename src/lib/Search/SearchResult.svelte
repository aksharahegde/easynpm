<script lang="ts">
	import type { Package, Payload, SearchResult } from '$lib/types/Results';
	import Reveal from '$lib/Shared/Reveal.svelte';
	import PackageDetails from './PackageDetails.svelte';
	import SearchResultCard from './SearchResultCard.svelte';
	import Toastr from '$lib/Shared/Toastr.svelte';

	export let payload: Payload;
	export let result: SearchResult;

	let loading = false;
	let selectedPackage: Package;
	let isDetailsOpen = false;
	let offset = 20;

	const openPackageDetails = (row: Package) => {
		isDetailsOpen = false;
		setTimeout(() => {
			selectedPackage = row;
			isDetailsOpen = true;
		}, 100);
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

		const url = `https://registry.npmjs.com/-/v1/search?${queryParams}`;
		const res = await fetch(url);
		const data = await res.json();
		loading = false;
		result.objects = result.objects.concat(data.objects);
		offset += data.objects.length;
	};
</script>

<div id="clipboard" class="sr-only" aria-hidden="true" />

{#if isDetailsOpen && selectedPackage}
	<PackageDetails {selectedPackage} on:closed={() => (isDetailsOpen = false)} />
{/if}

<Toastr />

{#if result}
	<div class="flex flex-wrap items-center justify-end gap-stack-sm pt-stack-md">
		<span class="font-body-sm text-body-sm text-slate-muted dark:text-gray-400">
			Showing {result.objects.length} of {result.total} results
		</span>
	</div>

	<div class="mt-stack-md flex flex-col gap-3">
		{#each result.objects as row, i (row.package.name)}
			<Reveal delay={Math.min(i * 60, 300)}>
				<SearchResultCard item={row} onView={openPackageDetails} />
			</Reveal>
		{/each}
	</div>

	{#if result.total > result.objects.length}
		<button
			type="button"
			data-testid="search-load-more"
			disabled={loading}
			class="interactive-press mt-gutter w-full rounded-xl border border-surface-border bg-surface-container-low py-4 font-body-md text-body-md font-semibold text-primary transition-all duration-300 ease-smooth hover:bg-surface-container disabled:opacity-60 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
			on:click={loadMore}
		>
			{loading ? 'Loading…' : 'View more'}
		</button>
	{/if}
{/if}

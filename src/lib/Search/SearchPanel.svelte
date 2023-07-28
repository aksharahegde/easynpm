<script lang="ts">
	import {
		Accordion,
		AccordionItem,
		Alert,
		Button,
		Card,
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
		<Search
			size="lg"
			on:input={fetchSearchResults}
			class="md:py-3"
			placeholder="Start typing a package name"
		/>
		<Button
			color="primary"
			class="!p-2.5 relative"
			size="lg"
			on:click={() => (showAdvancedFilters = !showAdvancedFilters)}
		>
			<CogOutline />
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
					<Button
						color="dark"
						on:click={clearFilters}
						class="mr-2 dark:text-primary-700 dark:hover:text-primary-600"
					>
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
		<div
			class="flex overflow-hidden relative flex-col gap-6 items-center p-4 mt-4 w-full text-gray-500 rounded-lg border border-gray-200 divide-gray-200 shadow-md md:flex-row fbg-white dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 dark:divide-gray-700 sm:p-6"
		>
			<svg class="mb-2 w-24 text-gray-500" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
				<path
					fill="currentColor"
					d="M12 16.667a4.666 4.666 0 1 0 0-9.333a4.666 4.666 0 0 0 0 9.333m8 6a2.666 2.666 0 1 0 0-5.333a2.666 2.666 0 0 0 0 5.333m-13.333-2a3.343 3.343 0 0 1-3.334-3.334v-2.666H0v2.666A6.665 6.665 0 0 0 6.667 24h2.666v-3.333zm-3.334-14c0-1.834 1.5-3.334 3.334-3.334h2.666V0H6.667A6.665 6.665 0 0 0 0 6.667v2.666h3.333zm14-3.334c1.834 0 3.334 1.5 3.334 3.334v2.666H24V6.667A6.665 6.665 0 0 0 17.333 0h-2.666v3.333Z"
				/>
			</svg>
			<div>
				<h5
					class="mb-2 text-2xl font-semibold tracking-tight text-center text-gray-900 md:text-left dark:text-gray-400"
				>
					Start searching..
				</h5>
				<p class="mb-3 font-normal text-center text-gray-500 md:text-left dark:text-gray-400">
					Please enter a package name to get started.
				</p>
			</div>
			<svg
				class="absolute -right-6 -bottom-6 w-24 text-gray-700 md:bottom-0 md:right-5 md:w-96"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					opacity="0.5"
					d="M9.99088 16.5L9.01504 16.9741C7.0341 17.5217 6.04363 17.7955 5.50972 17.2192C4.97582 16.6429 5.25206 15.5982 5.80455 13.5087L5.94749 12.9682C6.10449 12.3744 6.18299 12.0775 6.14352 11.7831C6.10404 11.4887 5.95106 11.2301 5.6451 10.713L5.36655 10.2421C4.28985 8.4221 3.75151 7.51211 4.11106 6.78804C4.4706 6.06397 5.48992 6.00535 7.52857 5.88812L8.05599 5.85779C8.63531 5.82448 8.92497 5.80782 9.17756 5.67305C9.43014 5.53828 9.61705 5.30066 9.99088 4.82542L10.3312 4.39274C11.6467 2.72034 12.3045 1.88413 13.0606 2.01293C13.8167 2.14173 14.1705 3.15023 14.8779 5.16723L15.0609 5.68905C15.262 6.26222 15.3625 6.5488 15.5581 6.75991C15.7537 6.97102 16.0222 7.08275 16.5592 7.30622L17.048 7.50967C18.9378 8.29605 19.8826 8.68925 19.9904 9.49292C20.0823 10.1786 19.513 10.7756 18.3493 11.7831"
					stroke="currentColor"
					stroke-width="1.5"
				/>
				<path
					d="M15.2516 10.689C14.265 9.50847 13.7716 8.91821 13.2045 9.00913C12.6375 9.10004 12.3722 9.81193 11.8416 11.2357L11.7043 11.604C11.5535 12.0086 11.4781 12.2109 11.3314 12.3599C11.1848 12.509 10.9834 12.5878 10.5806 12.7456L10.214 12.8892C8.79667 13.4443 8.08803 13.7218 8.00721 14.2891C7.92639 14.8564 8.52692 15.3378 9.72797 16.3004L10.0387 16.5495C10.38 16.8231 10.5507 16.9599 10.6494 17.1471C10.7482 17.3343 10.7639 17.5508 10.7954 17.9837L10.824 18.3779C10.9347 19.9015 10.9901 20.6633 11.5072 20.923C12.0244 21.1827 12.6608 20.7683 13.9337 19.9395L14.263 19.7251C14.6247 19.4896 14.8056 19.3718 15.0133 19.3385C15.2211 19.3052 15.4322 19.3601 15.8543 19.47L16.2387 19.57C17.7244 19.9565 18.4673 20.1498 18.8677 19.743C19.2681 19.3362 19.061 18.5987 18.6466 17.1238L18.5394 16.7422C18.4216 16.3231 18.3628 16.1135 18.3924 15.9057C18.422 15.6979 18.5367 15.5154 18.7662 15.1503L18.9751 14.818C19.7826 13.5332 20.1864 12.8909 19.9167 12.3798C19.647 11.8687 18.8826 11.8273 17.3536 11.7446L16.958 11.7231C16.5235 11.6996 16.3063 11.6879 16.1168 11.5927C15.9274 11.4976 15.7872 11.3299 15.5068 10.9944L15.2516 10.689Z"
					stroke="currentColor"
					stroke-width="1.5"
				/>
			</svg>
		</div>
	{/if}
</div>

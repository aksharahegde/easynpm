<script lang="ts">
	import { goto } from '$app/navigation';
	import { packageManager, type PackageManager } from '$lib/stores/packageManager';

	let query = '';

	const managers: PackageManager[] = ['npm', 'yarn', 'pnpm'];

	function submitSearch() {
		const trimmed = query.trim();
		if (trimmed) {
			goto(`/search?q=${encodeURIComponent(trimmed)}`);
		} else {
			goto('/search');
		}
	}

	function onKeyDown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			e.preventDefault();
			submitSearch();
		}
	}

	function selectManager(manager: PackageManager) {
		packageManager.select(manager);
	}
</script>

<section class="px-margin-mobile pb-section-gap pt-32 md:px-gutter">
	<div class="mx-auto max-w-container-max text-center">
		<div
			class="mb-stack-md inline-block rounded-full bg-primary-fixed px-stack-md py-1 font-label-caps text-label-caps text-on-primary-fixed-variant"
		>
			THE ALTERNATIVE TO NPMJS
		</div>
		<h1 class="mb-stack-md font-headline-xl text-headline-xl text-slate-text dark:text-gray-100">
			Search. Find. Install.
		</h1>
		<p
			class="mx-auto mb-stack-lg max-w-2xl font-body-md text-body-md text-slate-muted dark:text-gray-400"
		>
			The ultra-fast developer companion for discovering packages. Built for speed, precision, and
			zero-distraction engineering workflows.
		</p>

		<div class="group relative mx-auto max-w-3xl">
			<div class="pointer-events-none absolute inset-y-0 left-4 flex items-center">
				<span class="material-symbols-outlined text-slate-muted">search</span>
			</div>
			<input
				id="home-hero-search"
				data-testid="home-search-input"
				type="text"
				bind:value={query}
				on:keydown={onKeyDown}
				placeholder="Search for packages (e.g., react, lodash, tailwind)..."
				class="w-full rounded-xl border border-surface-border bg-surface-container-lowest py-5 pl-14 pr-16 font-body-md text-body-md text-on-surface shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:shadow-md dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
			/>
			<div class="pointer-events-none absolute inset-y-0 right-4 hidden items-center md:flex">
				<kbd
					class="inline-flex items-center gap-1 rounded border border-surface-border bg-surface-container px-2 py-1 font-code-snippet text-body-sm text-slate-muted dark:border-gray-600 dark:bg-gray-700"
				>
					<span class="text-xs">⌘</span>K
				</kbd>
			</div>
		</div>

		<div class="mt-stack-lg flex flex-wrap justify-center gap-stack-md">
			<div
				class="flex rounded-lg border border-surface-border bg-surface-container-low p-1 dark:border-gray-600 dark:bg-gray-800"
			>
				{#each managers as manager}
					<button
						type="button"
						data-testid={`home-package-manager-${manager}`}
						class="rounded px-stack-md py-2 font-label-caps text-label-caps transition-all {$packageManager ===
						manager
							? 'bg-primary text-on-primary'
							: 'text-secondary hover:bg-surface-container dark:text-gray-400'}"
						on:click={() => selectManager(manager)}
					>
						{manager.toUpperCase()}
					</button>
				{/each}
			</div>
		</div>
	</div>
</section>

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
			class="animate-fade-in-up mb-stack-md inline-block rounded-full bg-primary-fixed px-stack-md py-1 font-label-caps text-label-caps text-on-primary-fixed-variant"
			style="animation-delay: 0ms"
		>
			THE ALTERNATIVE TO NPMJS
		</div>
		<h1
			class="animate-fade-in-up mb-stack-md font-headline-xl text-headline-xl text-slate-text dark:text-gray-100"
			style="animation-delay: 80ms"
		>
			Search. Find. Install.
		</h1>
		<p
			class="animate-fade-in-up mx-auto mb-stack-lg max-w-2xl font-body-md text-body-md text-slate-muted dark:text-gray-400"
			style="animation-delay: 160ms"
		>
			The ultra-fast developer companion for discovering packages. Built for speed, precision, and
			zero-distraction engineering workflows.
		</p>

		<div
			class="animate-fade-in-up group relative mx-auto max-w-3xl"
			style="animation-delay: 240ms"
		>
			<div
				class="pointer-events-none absolute inset-y-0 left-4 flex items-center transition-transform duration-300 ease-smooth group-focus-within:scale-110"
			>
				<span class="material-symbols-outlined text-slate-muted transition-colors duration-300 group-focus-within:text-primary"
					>search</span
				>
			</div>
			<input
				id="home-hero-search"
				data-testid="home-search-input"
				type="text"
				bind:value={query}
				on:keydown={onKeyDown}
				placeholder="Search for packages (e.g., react, lodash, tailwind)..."
				class="w-full rounded-xl border border-surface-border bg-surface-container-lowest py-5 pl-14 pr-16 font-body-md text-body-md text-on-surface shadow-sm transition-all duration-300 ease-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:shadow-md focus:scale-[1.01] dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
			/>
			<div class="pointer-events-none absolute inset-y-0 right-4 hidden items-center md:flex">
				<kbd
					class="inline-flex items-center gap-1 rounded border border-surface-border bg-surface-container px-2 py-1 font-code-snippet text-body-sm text-slate-muted transition-opacity duration-300 group-focus-within:opacity-70 dark:border-gray-600 dark:bg-gray-700"
				>
					<span class="text-xs">⌘</span>K
				</kbd>
			</div>
		</div>

		<div
			class="animate-fade-in-up mt-stack-lg flex flex-wrap justify-center gap-stack-md"
			style="animation-delay: 320ms"
		>
			<div
				class="flex rounded-lg border border-surface-border bg-surface-container-low p-1 dark:border-gray-600 dark:bg-gray-800"
			>
				{#each managers as manager}
					<button
						type="button"
						data-testid={`home-package-manager-${manager}`}
						class="interactive-press rounded px-stack-md py-2 font-label-caps text-label-caps transition-all duration-300 ease-smooth {$packageManager ===
						manager
							? 'scale-100 bg-primary text-on-primary shadow-sm'
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

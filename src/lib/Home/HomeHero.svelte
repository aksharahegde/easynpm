<script lang="ts">
	import { goto } from '$app/navigation';
	import { packageManager, type PackageManager } from '$lib/stores/packageManager';

	let query = '';

	const managers: PackageManager[] = ['npm', 'yarn', 'pnpm'];

	function submitSearch() {
		const trimmed = query.trim();
		goto(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : '/search');
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

<section class="relative px-5 pb-28 pt-32 md:px-6">
	<!-- Subtle gradient wash for depth -->
	<div
		class="pointer-events-none absolute inset-0 -z-10"
		style="background: radial-gradient(ellipse 80% 50% at 20% 40%, var(--color-accent-soft) 0%, transparent 70%)"
	></div>

	<div class="mx-auto" style="max-width: var(--page-max)">
		<h1
			class="animate-fade-in-up font-display text-display text-ink"
			style="animation-delay: 0ms; overflow-wrap: anywhere; min-width: 0"
		>
			Search. Find. Install.
		</h1>

		<!-- Accent bar — small decorative rule -->
		<div
			class="animate-fade-in-up mt-5 h-1 w-16 rounded-pill bg-accent"
			style="animation-delay: 60ms"
		></div>

		<p
			class="animate-fade-in-up mt-6 max-w-lg text-lg leading-relaxed text-muted"
			style="animation-delay: 100ms"
		>
			The developer companion for discovering npm packages. Built for speed, precision, and
			zero-distraction workflows.
		</p>

		<div class="animate-fade-in-up group relative mt-10 max-w-2xl" style="animation-delay: 180ms">
			<div class="pointer-events-none absolute inset-y-0 left-5 flex items-center">
				<span
					class="material-symbols-outlined text-[22px] text-neutral transition-colors duration-[var(--dur-short)] group-focus-within:text-accent"
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
				class="w-full rounded-lg border border-rule bg-paper py-5 pl-14 pr-16 text-base text-ink shadow-whisper placeholder:text-neutral focus:border-accent focus:shadow-lifted focus:outline-none"
				style="transition: border-color var(--dur-short) var(--ease-out), box-shadow var(--dur-short) var(--ease-out)"
			/>
			<div class="pointer-events-none absolute inset-y-0 right-5 hidden items-center md:flex">
				<kbd
					class="inline-flex items-center gap-1 rounded-sm border border-rule bg-paper-2 px-2.5 py-1 font-mono text-xs text-neutral"
				>
					<span class="text-[10px]">⌘</span>K
				</kbd>
			</div>
		</div>

		<div class="animate-fade-in-up mt-6 flex gap-1.5" style="animation-delay: 260ms">
			{#each managers as manager}
				<button
					type="button"
					data-testid={`home-package-manager-${manager}`}
					class="press rounded-pill px-5 py-2 font-mono text-xs font-medium uppercase tracking-wide transition-colors duration-[var(--dur-short)]
					{$packageManager === manager
						? 'bg-ink text-paper shadow-whisper'
						: 'border border-rule text-muted hover:bg-paper-3 hover:text-ink'}"
					on:click={() => selectManager(manager)}
				>
					{manager}
				</button>
			{/each}
		</div>
	</div>
</section>

<!-- Marquee Hero divider -->
<div class="px-5 md:px-6">
	<div class="mx-auto border-t-[3px] border-rule" style="max-width: var(--page-max)"></div>
</div>

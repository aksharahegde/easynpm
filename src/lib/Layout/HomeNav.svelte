<script lang="ts">
	import { page } from '$app/stores';
	import { DarkMode } from 'flowbite-svelte';
	import BagTrigger from '$lib/Shared/BagTrigger.svelte';
</script>

<nav
	class="fixed top-0 w-full border-b border-rule backdrop-blur-md"
	style="z-index: 200; background: var(--color-nav-bg)"
>
	<div
		class="mx-auto flex h-16 items-center justify-between px-5 md:px-6"
		style="max-width: var(--page-max)"
	>
		<a
			href="/"
			class="flex items-center gap-2 font-display text-xl font-bold tracking-[-0.015em] text-ink transition-opacity duration-[var(--dur-micro)] hover:opacity-70"
		>
			<span class="material-symbols-outlined text-accent" style="font-size: 22px">search</span>
			EasyNPM
		</a>
		<div class="flex items-center gap-5">
			<div class="hidden items-center gap-4 md:flex">
				<a
					href="/"
					class="text-sm font-medium transition-colors duration-[var(--dur-short)] {$page.url
						.pathname === '/'
						? 'text-accent'
						: 'text-muted hover:text-ink'}"
				>
					Home
				</a>
				<a
					href="/search"
					class="text-sm font-medium transition-colors duration-[var(--dur-short)] {$page.url
						.pathname === '/search'
						? 'text-accent'
						: 'text-muted hover:text-ink'}"
				>
					Search
				</a>
			</div>
			<DarkMode />
			<BagTrigger triggerId="bag-trigger" testId="nav-bag-open" />
		</div>
	</div>
</nav>

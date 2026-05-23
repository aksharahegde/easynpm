<script lang="ts">
	import { page } from '$app/stores';
	import { DarkMode } from 'flowbite-svelte';
	import BagTrigger from '$lib/Shared/BagTrigger.svelte';
</script>

<nav
	class="fixed top-0 z-50 w-full border-b border-surface-border bg-surface/95 backdrop-blur-md transition-[background-color,box-shadow] duration-300 dark:border-gray-700 dark:bg-gray-900/95"
>
	<div
		class="mx-auto flex h-16 max-w-container-max items-center justify-between px-margin-mobile md:px-gutter"
	>
		<div class="flex items-center gap-stack-lg">
			<a
				href="/"
				class="font-headline-lg text-headline-lg font-bold text-primary transition-opacity duration-200 hover:opacity-80"
			>
				EasyNPM
			</a>
			<div class="hidden items-center gap-stack-md md:flex">
				<a
					href="/"
					class="font-body-md text-body-md pb-1 transition-all duration-300 ease-smooth {$page.url.pathname ===
					'/'
						? 'border-b-2 border-primary font-bold text-primary'
						: 'text-secondary hover:text-primary dark:text-gray-400'}"
				>
					Home
				</a>
				<a
					href="/search"
					class="font-body-md text-body-md pb-1 transition-all duration-300 ease-smooth {$page.url.pathname ===
					'/search'
						? 'border-b-2 border-primary font-bold text-primary'
						: 'text-secondary hover:text-primary dark:text-gray-400'}"
				>
					Search
				</a>
			</div>
		</div>
		<div class="flex items-center gap-stack-sm">
			<DarkMode />
			<BagTrigger triggerId="bag-trigger" testId="nav-bag-open" />
		</div>
	</div>
</nav>

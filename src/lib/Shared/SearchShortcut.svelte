<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	function focusSearch() {
		if ($page.url.pathname === '/') {
			const heroInput = document.getElementById('home-hero-search') as HTMLInputElement | null;
			if (heroInput) {
				heroInput.focus();
				return;
			}
		}

		if ($page.url.pathname === '/search') {
			const searchInput = document.getElementById('search-input') as HTMLInputElement | null;
			if (searchInput) {
				searchInput.focus();
				return;
			}
		}

		goto('/search');
	}

	onMount(() => {
		if (!browser) return;

		const onKeyDown = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
				e.preventDefault();
				focusSearch();
			}
		};

		window.addEventListener('keydown', onKeyDown);
		return () => window.removeEventListener('keydown', onKeyDown);
	});
</script>

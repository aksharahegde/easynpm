<script lang="ts">
	import '../app.css';
	import BagFab from '$lib/Layout/BagFab.svelte';
	import HomeFooter from '$lib/Layout/HomeFooter.svelte';
	import HomeNav from '$lib/Layout/HomeNav.svelte';
	import SearchShortcut from '$lib/Shared/SearchShortcut.svelte';
</script>

<SearchShortcut />

<div class="relative min-h-screen">
	<HomeNav />
	<main class="pt-16">
		<slot />
	</main>
	<HomeFooter />
	<BagFab />
</div>

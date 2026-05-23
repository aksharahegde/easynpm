<script>
	import HomeCta from '$lib/Home/HomeCta.svelte';
	import HomeFeatures from '$lib/Home/HomeFeatures.svelte';
	import HomeHero from '$lib/Home/HomeHero.svelte';
	import HomeProductPreview from '$lib/Home/HomeProductPreview.svelte';
</script>

<HomeHero />
<HomeFeatures />
<HomeProductPreview />
<HomeCta />

<svelte:head>
	<title>EasyNPM | Search. Find. Install.</title>
	<meta name="title" content="EasyNPM | Search. Find. Install." />
	<meta
		name="description"
		content="The ultra-fast developer companion for discovering npm packages. Search, find, and install with one-click commands."
	/>

	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://easynpm.netlify.app/" />
	<meta property="og:title" content="EasyNPM | Search. Find. Install." />
	<meta
		property="og:description"
		content="The ultra-fast developer companion for discovering npm packages. Search, find, and install with one-click commands."
	/>
	<meta property="og:image" content="https://easynpm.netlify.app/logo.png" />

	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://easynpm.netlify.app/" />
	<meta property="twitter:title" content="EasyNPM | Search. Find. Install." />
	<meta
		property="twitter:description"
		content="The ultra-fast developer companion for discovering npm packages. Search, find, and install with one-click commands."
	/>
	<meta property="twitter:image" content="https://easynpm.netlify.app/logo.png" />
</svelte:head>

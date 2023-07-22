<script>
	import Hero from '$lib/Home/Hero.svelte';
	import KeyFeatures from '$lib/Home/KeyFeatures.svelte';
	import AdvancedFilter from '$lib/Home/AdvancedFilter.svelte';
	import BagFeature from '$lib/Home/BagFeature.svelte';
	import Credits from '$lib/Home/Credits.svelte';
</script>

<Hero />
<KeyFeatures />
<AdvancedFilter />
<BagFeature />
<Credits />
<svelte:head>
	<!-- Primary Meta Tags -->
	<title>Discover, Explore, and Find the Perfect NPM Packages</title>
	<meta name="title" content="Discover, Explore, and Find the Perfect NPM Packages" />
	<meta
		name="description"
		content="Find top Node.js packages easily. Streamline development, boost productivity. Discover, explore, and choose with confidence. Start searching now!"
	/>

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://easynpm.netlify.app/" />
	<meta property="og:title" content="Discover, Explore, and Find the Perfect NPM Packages" />
	<meta
		property="og:description"
		content="Find top Node.js packages easily. Streamline development, boost productivity. Discover, explore, and choose with confidence. Start searching now!"
	/>
	<meta property="og:image" content="https://easynpm.netlify.app/logo.png" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://easynpm.netlify.app/" />
	<meta property="twitter:title" content="Discover, Explore, and Find the Perfect NPM Packages" />
	<meta
		property="twitter:description"
		content="Find top Node.js packages easily. Streamline development, boost productivity. Discover, explore, and choose with confidence. Start searching now!"
	/>
	<meta property="twitter:image" content="https://easynpm.netlify.app/logo.png" />
</svelte:head>

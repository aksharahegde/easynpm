<script>
	// @ts-nocheck
	import { A, Button } from 'flowbite-svelte';

	import { page } from '$app/stores';
	import { HomeSolid, SearchSolid, StarSolid } from 'flowbite-svelte-icons';
</script>

<section class="flex justify-center items-center h-[calc(100vh-144px)] bg-white dark:bg-gray-900">
	<div class="px-4 py-8 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
		<div class="flex-col justify-center items-center mx-auto max-w-screen-sm text-center">
			<h1
				class="mb-4 text-7xl font-extrabold tracking-tight lg:text-9xl text-primary-600 dark:text-primary-500"
			>
				{$page.status}
			</h1>
			<p class="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
				{$page.error.message}
			</p>
			<p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
				Sorry, we can't find that page. You'll find lots to explore on the <A
					href="/"
					class="font-semibold text-primary-600 dark:text-primary-500">homepage</A
				>.
			</p>
			<div class="flex gap-2 justify-center items-center">
                <Button outline href="/">
                    <HomeSolid size="sm" class="mr-2" />
                    Home
                </Button>
                <Button href="/search">
                    <SearchSolid size="sm" class="mr-2" />
                    Search
                </Button>
                <Button outline href="https://www.npmjs.com/?ref=easynpm" target="_blank">
                    <StarSolid size="sm" class="mr-2" />
                    NPM
                </Button>
            </div>
		</div>
	</div>
</section>
<svelte:head>
  <title>Discover, Explore, and Find the Perfect NPM Packages</title>
  <meta name="description" content="Find top Node.js packages easily. Streamline development, boost productivity. Discover, explore, and choose with confidence. Start searching now!" />
</svelte:head>

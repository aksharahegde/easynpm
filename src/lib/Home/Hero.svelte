<script>
	import DeviceMockupDesktop from '$lib/Home/DeviceMockupDesktop.svelte';
	import { Button } from 'flowbite-svelte';
	import { SearchOutline } from 'flowbite-svelte-icons';
</script>

<section class="container mx-auto min-h-[calc(100vh-144px)]">
	<div class="px-4 py-8 md:text-center lg:py-16 lg:px-12">
		<div class="mb-2 text-xl font-bold leading-none lg:text-2xl xl:text-4xl text-primary-700">
			Easy NPM
		</div>
		<h1
			class="mb-4 text-4xl font-extrabold text-gray-900 md:tracking-tight md:leading-none md:text-5xl lg:text-6xl dark:text-white"
		>
			Search. Find. Install.
		</h1>
		<p
			class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400"
		>
			Focus on building your application, not hours on searching packages.
		</p>
		<div class="mx-auto mb-8 lg:mb-16">
			<a href="/search">
				<Button shadow color="primary" size="lg">
					<SearchOutline size="md" class="mr-2" />
					Search a package
				</Button>
			</a>
		</div>
	</div>
	<DeviceMockupDesktop />
</section>

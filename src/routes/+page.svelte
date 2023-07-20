<script>
	import { Button } from 'flowbite-svelte';
	import { SearchOutline } from 'flowbite-svelte-icons';
</script>

<section class="xl:pt-24">
	<div class="px-4 py-8 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
		<div class="mb-2 text-xl font-bold leading-none lg:text-2xl xl:text-4xl text-primary-700">
			Easy NPM
		</div>
		<h1
			class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
		>
			Search NPM Packages
		</h1>
		<p
			class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400"
		>
			Focus on building your application, not searching hours on searching packages.
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
</section>

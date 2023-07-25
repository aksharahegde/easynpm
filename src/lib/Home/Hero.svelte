<script>
	import DeviceMockupDesktop from '$lib/Home/DeviceMockupDesktop.svelte';
	import { Banner, Button, Img } from 'flowbite-svelte';
	import { SearchOutline } from 'flowbite-svelte-icons';
</script>

<section class="container mx-auto min-h-[calc(100vh-144px)] relative">
	<div class="px-4 py-8 md:text-center lg:py-16 lg:px-12">
		<Img src="/logo.svg" alt="Easy NPM Logo" size="w-32 md:w-56" imgClass="md:mx-auto" />
		<h1
			class="mb-4 text-3xl font-extrabold text-gray-900 md:tracking-tight md:leading-none md:text-5xl lg:text-6xl dark:text-white"
		>
			Search. Find. Install.
		</h1>
		<p
			class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400"
		>
			Focus on building your application, not hours on searching packages.
		</p>
		<div class="flex gap-4 justify-center mx-auto mb-8 lg:mb-16">
			<a href="/search">
				<Button shadow color="primary" size="lg">
					<SearchOutline size="md" class="mr-2" />
					Search a package
				</Button>
			</a>
		</div>
		<div class="flex justify-center mx-auto">
			<a href="https://www.producthunt.com/posts/easynpm?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-easynpm" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=405957&theme=dark" alt="EasyNPM - Search&#0032;&#0038;&#0032;install&#0032;command&#0032;with&#0032;one&#0045;click&#0032;for&#0032;npm&#0032;packages | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>
		</div>
	</div>
	<DeviceMockupDesktop />
</section>

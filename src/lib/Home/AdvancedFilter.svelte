<script lang="ts">
	import { Img } from 'flowbite-svelte';
	import { CogOutline, StarSolid, ThumbsUpSolid } from 'flowbite-svelte-icons';
</script>

<div class="py-16">
	<div class="px-6 m-auto text-gray-600 xl:container md:px-12 xl:px-16">
		<div
			class="lg:bg-gray-50 dark:lg:bg-gray-800 lg:p-16 rounded-[4rem] space-y-6 md:flex flex-row-reverse md:gap-6 justify-center md:space-y-0 lg:items-center"
		>
			<div class="md:5/12 lg:w-1/2">
				<Img
					src="/advanced_filter.png"
					alt="advanced filter"
					size="lg:max-w-lg"
					loading="lazy"
					class="hidden rounded-lg dark:block"
				/>
				<Img
					src="/advanced_filter_light.png"
					alt="advanced filter"
					size="lg:max-w-lg"
					loading="lazy"
					class="block rounded-lg dark:hidden"
				/>
			</div>
			<div class="md:7/12 lg:w-1/2">
				<h2 class="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
					Advanced filters
				</h2>
				<p class="text-lg text-gray-600 dark:text-gray-300">
					Find the best packages for your project with advanced filters
				</p>
				<div class="space-y-4 divide-y divide-gray-100 dark:divide-gray-800">
					<div class="flex gap-4 mt-8 md:items-center">
						<div class="flex gap-4 w-12 h-12 rounded-full bg-primary-100 dark:bg-indigo-900/20">
							<StarSolid class="m-auto w-6 h-6 text-primary-500 dark:text-primary-400" />
						</div>
						<div class="w-5/6">
							<h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300">Quality</h3>
							<p class="text-gray-500 dark:text-gray-400">
								how much of an effect should quality have on search results.
							</p>
						</div>
					</div>
					<div class="flex gap-4 pt-4 md:items-center">
						<div class="flex gap-4 w-12 h-12 rounded-full bg-primary-100 dark:bg-indigo-900/20">
							<ThumbsUpSolid class="m-auto w-6 h-6 text-primary-600 dark:text-primary-400" />
						</div>
						<div class="w-5/6">
							<h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300">Popularity</h3>
							<p class="text-gray-500 dark:text-gray-400">
								How much of an effect should popularity have on search results.
							</p>
						</div>
					</div>
					<div class="flex gap-4 pt-4 md:items-center">
						<div class="flex gap-4 w-12 h-12 rounded-full bg-primary-100 dark:bg-indigo-900/20">
							<CogOutline class="m-auto w-6 h-6 text-primary-600 dark:text-primary-400" />
						</div>
						<div class="w-5/6">
							<h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300">Maintenance</h3>
							<p class="text-gray-500 dark:text-gray-400">
								How much of an effect should maintenance have on search results.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

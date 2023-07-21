<script>
	import { BagSolid, TableColumnSolid, TerminalSolid } from 'flowbite-svelte-icons';
	import DeviceMockupDesktop from './DeviceMockupDesktop.svelte';
</script>

<section class="py-10 bg-gray-50 dark:bg-gray-900 sm:py-16 lg:py-24">
	<div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
		<div class="mx-auto max-w-xl md:text-center">
			<p class="text-sm font-semibold tracking-widest text-gray-600 uppercase dark:text-gray-300">
				Alternative to
			</p>
			<h2 class="text-3xl font-bold leading-tight md:mt-6 text-primary-600 sm:text-4xl lg:text-5xl">
				npmjs
			</h2>
		</div>

		<div class="grid grid-cols-1 gap-x-4 gap-y-10 items-center mt-12 lg:grid-cols-5 sm:mt-20">
			<div class="space-y-8 lg:pr-16 xl:pr-24 lg:col-span-2 lg:space-y-12">
				<div class="flex items-start">
					<TableColumnSolid class="flex-shrink-0 w-9 h-9 text-primary-600" />
					<div class="ml-5">
						<h3 class="text-xl font-semibold text-gray-800 dark:text-gray-300">Minimal UI</h3>
						<p class="mt-3 text-base text-gray-600 dark:text-gray-400">
							A clean and uncluttered user experience.
						</p>
					</div>
				</div>

				<div class="flex items-start">
					<TerminalSolid class="flex-shrink-0 w-9 h-9 text-primary-600" />
					<div class="ml-5">
						<h3 class="text-xl font-semibold text-gray-800 dark:text-gray-300">
							One-click Commands
						</h3>
						<p class="mt-3 text-base text-gray-600 dark:text-gray-400">
							Copy the install command with one-click for npm and yarn.
						</p>
						<code
							class="px-2 py-1 text-xs text-gray-600 rounded bg-slate-300 dark:text-gray-400 dark:bg-slate-800"
							>yarn add nuxt@2.15.2</code
						>
					</div>
				</div>

				<div class="flex items-start">
					<BagSolid class="flex-shrink-0 w-9 h-9 text-primary-600" />
					<div class="ml-5">
						<h3 class="text-xl font-semibold text-gray-800 dark:text-gray-300">Bag and Copy</h3>
						<p class="mt-3 text-base text-gray-600 dark:text-gray-400">
							Add multiple packages to bag and copy the command in bulk.
						</p>
						<code
							class="px-2 py-1 text-xs text-gray-600 rounded bg-slate-300 dark:text-gray-400 dark:bg-slate-800"
							>yarn add nuxt@2.15.2 vueuse@3.0.0</code
						>
					</div>
				</div>
			</div>

			<div class="lg:col-span-3">
				<DeviceMockupDesktop />
			</div>
		</div>
	</div>
</section>

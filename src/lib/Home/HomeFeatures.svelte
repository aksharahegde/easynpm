<script lang="ts">
	import Reveal from '$lib/Shared/Reveal.svelte';

	const features = [
		{
			icon: 'grid_view',
			title: 'Minimal UI',
			description:
				'Aggressive focus on readability. No ads, no bloat, just the data you need to make decisions fast.',
			imgLight: '/search_result_light.png',
			imgDark: '/search_result_dark.png',
			alt: 'EasyNPM search results showing package list with download stats and freshness indicators',
			imgPosition: 'left top'
		},
		{
			icon: 'terminal',
			title: 'One-click Commands',
			description:
				'Instantly copy installation commands for any package manager. Switch between npm, yarn, and pnpm flawlessly.',
			imgLight: '/one_click_light.png',
			imgDark: '/one_click_dark.png',
			alt: 'Install commands for npm, yarn, and pnpm displayed side by side',
			imgPosition: 'left bottom'
		},
		{
			icon: 'shopping_basket',
			title: 'Bag and Copy',
			description:
				'Add multiple packages to your "Bag" and generate a single installation command for your project.',
			imgLight: '/bag_light.png',
			imgDark: '/bag_dark.png',
			alt: 'Bag popover showing multiple packages ready for batch install',
			imgPosition: 'center top'
		}
	];
</script>

<section class="bg-accent-soft px-5 py-24 md:px-6">
	<div class="mx-auto" style="max-width: var(--page-max)">
		<div
			class="grid min-w-0 grid-cols-1 gap-5 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_minmax(0,0.85fr)]"
		>
			{#each features as feature, i}
				<Reveal delay={i * 100}>
					<div
						class="hover-lift flex min-w-0 flex-col overflow-hidden rounded-lg border border-rule bg-paper shadow-whisper"
					>
						<!-- Accent top bar -->
						<div class="h-0.5 bg-accent"></div>
						<div class="p-7">
							<div class="flex items-center gap-3">
								<div
									class="flex h-9 w-9 items-center justify-center rounded bg-accent-soft"
								>
									<span class="material-symbols-outlined text-lg text-accent"
										>{feature.icon}</span
									>
								</div>
								<h3 class="font-display text-lg font-bold tracking-tight text-ink">
									{feature.title}
								</h3>
							</div>
							<p class="mt-4 text-sm leading-relaxed text-muted">
								{feature.description}
							</p>
						</div>
						<figure class="relative mt-auto border-t border-rule">
							<img
								src={feature.imgLight}
								alt={feature.alt}
								class="block w-full object-cover dark:hidden"
								style="aspect-ratio: 3/2; object-position: {feature.imgPosition}"
								loading="lazy"
							/>
							<img
								src={feature.imgDark}
								alt={feature.alt}
								class="hidden w-full object-cover dark:block"
								style="aspect-ratio: 3/2; object-position: {feature.imgPosition}"
								loading="lazy"
							/>
							<!-- Soft bottom fade -->
							<div
								class="pointer-events-none absolute inset-x-0 bottom-0 h-12"
								style="background: linear-gradient(to top, var(--color-paper), transparent)"
							></div>
						</figure>
					</div>
				</Reveal>
			{/each}
		</div>
	</div>
</section>

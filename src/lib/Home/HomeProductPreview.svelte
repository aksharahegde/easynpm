<script lang="ts">
	import Reveal from '$lib/Shared/Reveal.svelte';

	const checklist = [
		'Mathematically precise package ranking',
		'Live bundle size tracking',
		'Real-time dependency graphs'
	];
</script>

<section class="px-5 py-28 md:px-6">
	<div class="mx-auto" style="max-width: var(--page-max)">
		<div class="flex flex-col gap-12 md:flex-row md:items-center md:gap-16">
			<Reveal class="flex-1">
				<h2 class="font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
					Experience Pure Performance
				</h2>
				<p class="mt-4 max-w-md text-base leading-relaxed text-muted">
					We've stripped away everything that slows you down. Search algorithms tuned for
					high-relevance results. Downloads, stars, and bundle size at a glance.
				</p>
				<div class="mt-8 space-y-3">
					{#each checklist as item, i}
						<Reveal delay={i * 60}>
							<div class="flex items-start gap-3">
								<div
									class="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent-soft"
								>
									<span
										class="material-symbols-outlined text-accent"
										style="font-size: 14px">check</span
									>
								</div>
								<span class="text-sm font-medium text-ink">{item}</span>
							</div>
						</Reveal>
					{/each}
				</div>
			</Reveal>

			<Reveal delay={120} class="min-w-0 flex-1">
				<div class="relative">
					<!-- Desktop screenshot -->
					<figure
						class="hover-lift overflow-hidden rounded-lg border border-rule shadow-lifted"
					>
						<img
							src="/advanced_filter_light.png"
							alt="Advanced filtering with quality, popularity, and maintenance sliders alongside search results"
							class="block w-full dark:hidden"
							loading="lazy"
						/>
						<img
							src="/advanced_filter.png"
							alt="Advanced filtering with quality, popularity, and maintenance sliders alongside search results"
							class="hidden w-full dark:block"
							loading="lazy"
						/>
					</figure>
					<!-- Mobile screenshot — overlapping corner for depth -->
					<figure
						class="absolute -bottom-6 -right-3 hidden w-28 overflow-hidden rounded-lg border border-rule shadow-lifted md:block"
						style="transform: rotate(2deg)"
					>
						<img
							src="/mobile_light.png"
							alt="EasyNPM mobile search view"
							class="block w-full dark:hidden"
							loading="lazy"
						/>
						<img
							src="/mobile_dark.png"
							alt="EasyNPM mobile search view"
							class="hidden w-full dark:block"
							loading="lazy"
						/>
					</figure>
				</div>
			</Reveal>
		</div>
	</div>
</section>

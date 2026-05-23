<script lang="ts">
	import Reveal from '$lib/Shared/Reveal.svelte';

	const features = [
		{
			icon: 'grid_view',
			title: 'Minimal UI',
			description:
				'Aggressive focus on readability. No ads, no bloat—just the data you need to make decisions fast.'
		},
		{
			icon: 'terminal',
			title: 'One-click Commands',
			description:
				'Instantly copy installation commands for any package manager. Switch between npm, yarn, and pnpm flawlessly.'
		},
		{
			icon: 'shopping_basket',
			title: 'Bag and Copy',
			description:
				'Add multiple packages to your "Bag" and generate a single installation command for your entire project dependencies.'
		}
	];
</script>

<section
	class="border-y border-surface-border bg-surface-container-lowest py-section-gap dark:border-gray-700 dark:bg-gray-900"
>
	<div class="mx-auto max-w-container-max px-margin-mobile md:px-gutter">
		<div class="grid grid-cols-1 gap-gutter md:grid-cols-3">
			{#each features as feature, i}
				<Reveal delay={i * 100}>
					<div
						class="group interactive-lift rounded-xl border border-surface-border bg-surface p-stack-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-primary/30"
					>
						<div
							class="mb-stack-md flex h-12 w-12 items-center justify-center rounded-lg bg-primary-fixed transition-transform duration-300 ease-smooth group-hover:scale-110"
						>
							<span
								class="material-symbols-outlined text-primary transition-transform duration-300 group-hover:rotate-3"
							>
								{feature.icon}
							</span>
						</div>
						<h3
							class="mb-stack-sm font-headline-lg text-headline-lg text-slate-text dark:text-gray-100"
						>
							{feature.title}
						</h3>
						<p class="font-body-sm text-body-sm text-slate-muted dark:text-gray-400">
							{feature.description}
						</p>
					</div>
				</Reveal>
			{/each}
		</div>
	</div>
</section>

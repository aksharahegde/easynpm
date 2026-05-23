<section class="overflow-hidden px-margin-mobile py-section-gap md:px-gutter">
	<div class="mx-auto max-w-container-max">
		<div class="flex flex-col items-center gap-gutter md:flex-row">
			<div class="flex-1">
				<h2 class="mb-stack-md font-headline-lg text-headline-lg text-slate-text dark:text-gray-100">
					Experience Pure Performance
				</h2>
				<p class="mb-stack-lg font-body-md text-body-md text-slate-muted dark:text-gray-400">
					We've stripped away everything that slows you down. Our search algorithms are fine-tuned
					for high-relevance results, providing you with downloads, stars, and bundle size at a
					glance.
				</p>
				<div class="space-y-stack-sm">
					{#each ['Mathematically precise package ranking', 'Live bundle size tracking', 'Real-time dependency graphs'] as item}
						<div class="flex items-start gap-stack-sm">
							<span class="material-symbols-outlined mt-1 text-primary">check_circle</span>
							<span class="font-body-md text-body-md text-slate-text dark:text-gray-200">{item}</span>
						</div>
					{/each}
				</div>
			</div>

			<div class="w-full flex-1">
				<div class="relative">
					<div class="absolute -inset-4 -z-10 rounded-2xl bg-primary/10 blur-3xl"></div>
					<div
						class="overflow-hidden rounded-xl border border-surface-border bg-surface-container-lowest p-stack-md shadow-xl dark:border-gray-700 dark:bg-gray-800"
					>
						<div class="space-y-4">
							<div
								class="flex items-center justify-between border-b border-surface-border pb-4 dark:border-gray-700"
							>
								<div>
									<span class="font-code-snippet text-lg font-bold text-slate-text dark:text-gray-100"
										>lodash</span
									>
									<span class="ml-2 text-xs text-slate-muted">v4.17.21</span>
								</div>
								<span
									class="rounded bg-primary px-3 py-1 font-label-caps text-label-caps text-on-primary"
								>
									ADD TO BAG
								</span>
							</div>
							<div
								class="group/code relative rounded border border-surface-border bg-code-bg p-stack-md font-code-snippet text-body-sm text-slate-text dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
							>
								<code class="text-inherit">npm install lodash</code>
								<span
									class="material-symbols-outlined absolute right-3 top-3 cursor-pointer text-slate-muted group-hover/code:text-primary"
								>
									content_copy
								</span>
							</div>
							<div class="grid grid-cols-3 gap-2">
								{#each [{ label: 'STARS', value: '56k' }, { label: 'SIZE', value: '24kB' }, { label: 'NPM', value: '45M' }] as stat}
									<div
										class="rounded border border-surface-border bg-surface p-2 text-center dark:border-gray-600 dark:bg-gray-900"
									>
										<div class="text-xs uppercase tracking-wider text-slate-muted">{stat.label}</div>
										<div class="font-bold text-slate-text dark:text-gray-100">{stat.value}</div>
									</div>
								{/each}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

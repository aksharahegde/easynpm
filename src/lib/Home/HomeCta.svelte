<script lang="ts">
	import Reveal from '$lib/Shared/Reveal.svelte';
</script>

<section class="px-5 py-24 md:px-6">
	<Reveal>
		<div
			class="relative mx-auto overflow-hidden rounded-xl border border-rule bg-accent-soft p-10 md:p-16"
			style="max-width: var(--page-max)"
		>
			<!-- Decorative accent dot -->
			<div
				class="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-accent opacity-[0.07]"
			></div>
			<div
				class="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-accent opacity-[0.05]"
			></div>

			<div class="relative flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
				<div>
					<h2 class="font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
						Find your next dependency<span class="text-accent">.</span>
					</h2>
					<p class="mt-3 max-w-md text-base text-muted">
						Join developers who have made EasyNPM their default package search.
					</p>
				</div>
				<div class="flex flex-shrink-0 flex-col gap-3 sm:flex-row">
					<a
						href="/search"
						data-testid="home-cta-start-search"
						class="press inline-flex items-center justify-center rounded bg-accent px-7 py-3 text-sm font-semibold text-paper transition-colors duration-[var(--dur-short)] hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
						style="--tw-outline-color: var(--color-focus)"
					>
						Start Searching
					</a>
					<a
						href="https://github.com/aksharahegde/easynpm#readme"
						target="_blank"
						rel="noopener noreferrer"
						data-testid="home-cta-documentation"
						class="press inline-flex items-center justify-center rounded border border-rule bg-paper px-7 py-3 text-sm font-medium text-ink transition-colors duration-[var(--dur-short)] hover:bg-paper-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
						style="--tw-outline-color: var(--color-focus)"
					>
						View Documentation
					</a>
				</div>
			</div>
		</div>
	</Reveal>
</section>

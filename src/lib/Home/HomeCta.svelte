<script lang="ts">
	import Reveal from '$lib/Shared/Reveal.svelte';
</script>

<section class="px-5 py-24 md:px-6">
	<Reveal>
		<div
			class="relative mx-auto overflow-hidden rounded-xl bg-ink p-10 md:p-16"
			style="max-width: var(--page-max)"
		>
			<!-- Subtle radial glow -->
			<div
				class="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-20"
				style="background: radial-gradient(circle, var(--color-accent) 0%, transparent 70%)"
			></div>

			<div class="relative">
				<h2 class="font-display text-2xl font-bold tracking-tight text-paper md:text-3xl">
					Find your next dependency.
				</h2>
				<p class="mt-3 max-w-lg text-base" style="color: var(--color-neutral)">
					Join developers who have made EasyNPM their default package search.
				</p>
				<div class="mt-8 flex flex-col gap-3 sm:flex-row">
					<a
						href="/search"
						data-testid="home-cta-start-search"
						class="press inline-flex items-center justify-center rounded bg-paper px-7 py-3 text-sm font-semibold text-ink transition-all duration-[var(--dur-short)] hover:bg-accent hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
						style="--tw-outline-color: var(--color-focus)"
					>
						Start Searching
					</a>
					<a
						href="https://github.com/aksharahegde/easynpm#readme"
						target="_blank"
						rel="noopener noreferrer"
						data-testid="home-cta-documentation"
						class="press inline-flex items-center justify-center rounded border border-rule px-7 py-3 text-sm font-medium text-paper transition-colors duration-[var(--dur-short)] hover:bg-paper hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
						style="--tw-outline-color: var(--color-focus)"
					>
						View Documentation
					</a>
				</div>
			</div>
		</div>
	</Reveal>
</section>

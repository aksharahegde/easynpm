<script lang="ts">
	import Reveal from '$lib/Shared/Reveal.svelte';
</script>

<section class="px-margin-mobile py-section-gap md:px-gutter">
	<Reveal>
		<div
			class="relative mx-auto max-w-container-max overflow-hidden rounded-2xl bg-primary p-stack-lg text-center md:p-20"
		>
			<div
				class="absolute right-0 top-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 animate-soft-pulse rounded-full bg-white/10 blur-3xl"
			></div>
			<div class="relative z-10">
				<h2 class="mb-stack-md font-headline-xl text-headline-xl text-on-primary">
					Ready to optimize your workflow?
				</h2>
				<p class="mx-auto mb-stack-lg max-w-xl font-body-md text-body-md text-white/80">
					Join thousands of developers who have made EasyNPM their default package search engine.
				</p>
				<div class="flex flex-col justify-center gap-stack-md sm:flex-row">
					<a
						href="/search"
						data-testid="home-cta-start-search"
						class="interactive-press rounded-lg bg-surface-container-lowest px-8 py-4 font-bold text-primary transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:bg-primary-fixed hover:shadow-lg"
					>
						Start Searching
					</a>
					<a
						href="https://github.com/aksharahegde/easynpm#readme"
						target="_blank"
						rel="noopener noreferrer"
						data-testid="home-cta-documentation"
						class="interactive-press rounded-lg border border-white/20 bg-primary-container px-8 py-4 font-bold text-on-primary transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:bg-accent-orange-hover hover:shadow-lg"
					>
						View Documentation
					</a>
				</div>
			</div>
		</div>
	</Reveal>
</section>

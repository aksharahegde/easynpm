<script lang="ts">
	import { onMount } from 'svelte';

	/** Stagger delay in ms before the reveal transition starts */
	export let delay = 0;

	let className = '';
	export { className as class };

	let el: HTMLElement;
	let visible = false;

	onMount(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			visible = true;
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					visible = true;
					observer.disconnect();
				}
			},
			{ threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
		);

		observer.observe(el);
		return () => observer.disconnect();
	});
</script>

<div
	bind:this={el}
	class="reveal {visible ? 'reveal-visible' : ''} {className}"
	style={delay ? `--reveal-delay: ${delay}ms` : undefined}
>
	<slot />
</div>

<script lang="ts">
	import { onMount } from 'svelte';

	

	interface Props {
		/** Stagger delay in ms before the reveal transition starts */
		delay?: number;
		class?: string;
		children?: import('svelte').Snippet;
	}

	let { delay = 0, class: className = '', children }: Props = $props();
	

	let el: HTMLElement | undefined = $state();
	let visible = $state(false);

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

		if (!el) return;
		observer.observe(el);
		return () => observer.disconnect();
	});
</script>

<div
	bind:this={el}
	class="reveal {visible ? 'reveal-visible' : ''} {className}"
	style={delay ? `--reveal-delay: ${delay}ms` : undefined}
>
	{@render children?.()}
</div>

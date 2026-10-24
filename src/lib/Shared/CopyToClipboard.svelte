<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		val: string;
	}

	let { val = $bindable() }: Props = $props();

	let textarea: any = $state();

	onMount(() => {
		textarea.select();
		document.execCommand('copy');
	});
</script>

<textarea bind:value={val} bind:this={textarea}></textarea>

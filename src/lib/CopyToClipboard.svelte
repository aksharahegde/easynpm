<script lang="ts">
	import { onMount } from 'svelte';

	export let val: string;

	let textarea: any;

	onMount(() => {
		textarea.select();
		document.execCommand('copy');
	});
</script>

<textarea bind:value={val} bind:this={textarea} />

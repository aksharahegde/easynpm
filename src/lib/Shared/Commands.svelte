<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { notifications } from '$lib/stores/notifications';
	import CopyToClipboard from '../Shared/CopyToClipboard.svelte';

	const packageManagers = ['yarn add', 'npm install', 'pnpm install'];

	export let row: Package;
	export let short: boolean = false;

	const copyCommand = () => {
		const val: string = `${row.name}@${row.version}`;
		const app = new CopyToClipboard({
			target: document.getElementById('clipboard')!,
			props: { val }
		});
		app.$destroy();
		notifications.success('Copied to clipboard', 1000);
	};
</script>

{#each packageManagers as manager}
	<Button color="dark" outline size="sm" light on:click={() => copyCommand()}>
		<span class="text-xs"
			>{manager}
			{#if !short}
				{row.name}@{row.version}
			{/if}
		</span></Button
	>
{/each}

<script lang="ts">
	import { Button, Toggle } from 'flowbite-svelte';
	import { notifications } from '$lib/stores/notifications';
	import CopyToClipboard from '../Shared/CopyToClipboard.svelte';

	const packageManagers = ['yarn', 'npm', 'pnpm', 'bun'];
	const packageCommands: any = {
		yarn: 'add',
		bun: 'add',
		npm: 'install',
		pnpm: 'install'
	}
	export let row: Package;
	let isDevDependancy: boolean = false;

	const copyCommand = (manager: string) => {
		const val: string = `${manager} ${packageCommands[manager]}${isDevDependancy ? ' -D' : ''} ${row.name}@${row.version}`;
		const app = new CopyToClipboard({
			target: document.getElementById('clipboard')!,
			props: { val }
		});
		app.$destroy();
		notifications.success(`${val} copied to clipboard`, 1000);
	};
</script>

<Toggle color="orange" bind:checked={isDevDependancy} class="mr-4">Dev dependancy</Toggle>
{#each packageManagers as manager}
	<Button color="dark" outline size="sm" light on:click={() => copyCommand(manager)}>
		<span class="text-xs text-gray-300">{manager}</span>
	</Button>
{/each}

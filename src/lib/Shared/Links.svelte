<script lang="ts">
	import { Badge } from 'flowbite-svelte';
	import { LinkSolid } from 'flowbite-svelte-icons';

	export let row: Package;
</script>

<div class="flex gap-2 justify-end items-center my-2 w-full md:my-0">
	{#if row.links?.homepage}
		<Badge href={row.links?.homepage} color="indigo" target="_blank">
			<LinkSolid size="sm" class="mr-1 w-3" />
			Homepage
		</Badge>
	{/if}
	{#if row.links?.repository}
		<Badge href={row.links?.repository} color="indigo" target="_blank">
			<LinkSolid size="sm" class="mr-1 w-3" />
			Repository</Badge
		>
	{/if}
	{#if row.links?.bugs}
		<Badge href={row.links?.bugs} color="indigo" target="_blank">
			<LinkSolid size="sm" class="mr-1 w-3" />
			Bugs</Badge
		>
	{/if}
	{#if row.links?.npm}
		<Badge href={row.links?.npm} color="indigo" target="_blank">
			<LinkSolid size="sm" class="mr-1 w-3" />
			NPM</Badge
		>
	{/if}
</div>

<script lang="ts">
	import type { Package } from '$lib/types/Results';
	import { packageManager } from '$lib/stores/packageManager';
	import { buildInstallCommand, copyInstallCommand, getPackageManagers } from '$lib/utils/installCommand';

	export let row: Package;
	export let compact = false;

	export let isDevDependency = false;

	const managers = getPackageManagers();

	function copyCommand(manager: string) {
		copyInstallCommand(row, manager, isDevDependency);
	}

	function handleManagerClick(manager: string) {
		if (manager === 'npm' || manager === 'yarn' || manager === 'pnpm') {
			packageManager.select(manager);
		}
		copyCommand(manager);
	}
</script>

<div class="flex flex-col gap-stack-sm {compact ? '' : 'w-full'}">
	<label
		class="inline-flex cursor-pointer items-center gap-2 font-body-sm text-body-sm text-slate-muted dark:text-gray-400"
	>
		<input
			type="checkbox"
			bind:checked={isDevDependency}
			class="h-4 w-4 rounded border-surface-border text-primary focus:ring-primary"
		/>
		Dev dependency
	</label>

	<div
		class="flex flex-wrap gap-1 rounded-lg border border-surface-border bg-surface-container-low p-1 dark:border-gray-600 dark:bg-gray-800"
	>
		{#each managers as manager}
			<button
				type="button"
				class="interactive-press rounded px-2 py-1 font-label-caps text-label-caps transition-all duration-300 ease-smooth {$packageManager ===
				manager
					? 'bg-primary text-on-primary'
					: 'text-secondary hover:bg-surface-container dark:text-gray-400'}"
				on:click={() => handleManagerClick(manager)}
			>
				{manager}
			</button>
		{/each}
	</div>

	{#if !compact}
		<p class="font-code-snippet text-body-sm text-slate-muted dark:text-gray-400">
			{buildInstallCommand(row, $packageManager, isDevDependency)}
		</p>
	{/if}
</div>

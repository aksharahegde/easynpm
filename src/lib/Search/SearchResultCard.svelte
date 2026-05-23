<script lang="ts">
	import type { Package } from '$lib/types/Results';
	import { packageManager } from '$lib/stores/packageManager';
	import {
		buildInstallCommand,
		copyInstallCommand,
		getPackageManagers
	} from '$lib/utils/installCommand';
	import AddToBag from '$lib/Shared/AddToBag.svelte';
	import Links from '$lib/Shared/Links.svelte';

	export let pkg: Package;
	export let score: number;
	export let showLinks = false;
	export let onView: (pkg: Package) => void;

	let isDevDependency = false;

	const managers = getPackageManagers();

	$: scorePercent =
		Number.isFinite(score) && score > 0
			? Math.min(100, Math.max(0, Math.round(score <= 1 ? score * 100 : score)))
			: 0;
	$: primaryCommand = buildInstallCommand(pkg, $packageManager, isDevDependency);

	function copyPrimary() {
		copyInstallCommand(pkg, $packageManager, isDevDependency);
	}

	function handleManagerClick(manager: string) {
		if (manager === 'npm' || manager === 'yarn' || manager === 'pnpm') {
			packageManager.select(manager);
		}
		copyInstallCommand(pkg, manager, isDevDependency);
	}
</script>

<article
	data-testid="search-row-{pkg.name}"
	class="interactive-lift rounded-lg border border-surface-border bg-surface-container-lowest p-3 dark:border-gray-700 dark:bg-gray-800 md:p-4"
>
	<div class="flex items-start gap-2">
		<button type="button" class="min-w-0 flex-1 text-left" on:click={() => onView(pkg)}>
			<span class="inline-flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
				<span class="font-code-snippet text-base font-bold text-slate-text dark:text-gray-100">
					{pkg.name}
				</span>
				<span class="text-xs text-slate-muted dark:text-gray-400">v{pkg.version}</span>
			</span>
			{#if pkg.description}
				<p class="mt-0.5 line-clamp-1 font-body-sm text-body-sm text-slate-muted dark:text-gray-400">
					{pkg.description}
				</p>
			{/if}
		</button>
		<span
			class="shrink-0 rounded-full bg-primary-fixed px-2 py-0.5 text-xs font-semibold text-on-primary-fixed-variant"
			title="Relevance score"
		>
			{scorePercent}
		</span>
	</div>

	<div class="group/code relative mt-2">
		<div
			class="rounded border border-surface-border bg-code-bg py-1.5 pl-3 pr-9 font-code-snippet text-xs text-slate-text dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
		>
			<code class="text-inherit">{primaryCommand}</code>
		</div>
		<button
			type="button"
			class="absolute right-2 top-1/2 -translate-y-1/2 text-slate-muted transition-colors hover:text-primary"
			aria-label="Copy install command"
			on:click|stopPropagation={copyPrimary}
		>
			<span class="material-symbols-outlined text-[18px]">content_copy</span>
		</button>
	</div>

	<div
		class="mt-2 flex flex-wrap items-center gap-1.5 border-t border-surface-border pt-2 dark:border-gray-700"
	>
		<button
			type="button"
			class="interactive-press inline-flex items-center gap-1 rounded-md border border-surface-border px-2 py-1 text-xs text-slate-text transition-colors hover:border-primary/30 hover:text-primary dark:border-gray-600 dark:text-gray-200"
			on:click={() => onView(pkg)}
		>
			<span class="material-symbols-outlined text-[16px]">visibility</span>
			View
		</button>
		<AddToBag row={pkg} iconOnly />

		<label
			class="inline-flex cursor-pointer items-center gap-1 text-xs text-slate-muted dark:text-gray-400"
		>
			<input
				type="checkbox"
				bind:checked={isDevDependency}
				class="h-3.5 w-3.5 rounded border-surface-border text-primary focus:ring-primary"
			/>
			Dev
		</label>

		<div
			class="ml-auto flex rounded-md border border-surface-border bg-surface-container-low p-0.5 dark:border-gray-600 dark:bg-gray-900"
		>
			{#each managers as manager}
				<button
					type="button"
					class="rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide transition-colors {$packageManager ===
					manager
						? 'bg-primary text-on-primary'
						: 'text-secondary hover:text-primary dark:text-gray-400'}"
					on:click|stopPropagation={() => handleManagerClick(manager)}
				>
					{manager}
				</button>
			{/each}
		</div>
	</div>

	{#if showLinks}
		<div class="mt-2 border-t border-surface-border pt-2 dark:border-gray-700">
			<Links row={pkg} />
		</div>
	{/if}
</article>

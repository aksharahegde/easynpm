<script lang="ts">
	import type { Package, SearchObject } from '$lib/types/Results';
	import { formatDistance } from 'date-fns';
	import { packageManager } from '$lib/stores/packageManager';
	import {
		buildInstallCommand,
		copyInstallCommand,
		copyText,
		getPackageManagers
	} from '$lib/utils/installCommand';
	import {
		formatCount,
		formatScorePercent,
		parseRepositoryUrl
	} from '$lib/utils/packageStats';
	import AddToBag from '$lib/Shared/AddToBag.svelte';

	export let item: SearchObject;
	export let onView: (pkg: Package) => void;

	let isDevDependency = false;

	const managers = getPackageManagers();

	$: pkg = item.package;
	$: primaryCommand = buildInstallCommand(pkg, $packageManager, isDevDependency);
	$: coordinate = `${pkg.name}@${pkg.version}`;
	$: repositoryUrl = parseRepositoryUrl(pkg.links?.repository);
	$: weeklyDownloads = formatCount(item.downloads?.weekly);
	$: monthlyDownloads = formatCount(item.downloads?.monthly);
	$: dependentsCount = formatCount(item.dependents);
	$: updatedLabel = item.updated
		? formatDistance(new Date(item.updated), new Date(), { addSuffix: true })
		: null;
	$: qualityPercent = formatScorePercent(item.score?.detail?.quality);
	$: popularityPercent = formatScorePercent(item.score?.detail?.popularity);
	$: maintenancePercent = formatScorePercent(item.score?.detail?.maintenance);
	$: isInsecure = Boolean(item.flags?.insecure);
	$: publisherName = pkg.publisher?.username;
	$: displayKeywords = (pkg.keywords ?? []).slice(0, 3);

	function copyPrimary() {
		copyInstallCommand(pkg, $packageManager, isDevDependency);
	}

	function copyPackageName() {
		copyText(pkg.name, `${pkg.name} copied to clipboard`);
	}

	function copyCoordinate() {
		copyText(coordinate, `${coordinate} copied to clipboard`);
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
	<div class="flex items-start justify-between gap-2">
		<button type="button" class="min-w-0 flex-1 text-left" on:click={() => onView(pkg)}>
			<span class="inline-flex flex-wrap items-center gap-x-2 gap-y-1">
				<span class="font-code-snippet text-base font-bold text-slate-text dark:text-gray-100">
					{pkg.name}
				</span>
				<span class="text-xs text-slate-muted dark:text-gray-400">v{pkg.version}</span>
				{#if pkg.license}
					<span
						class="rounded border border-surface-border px-1.5 py-0.5 font-body-sm text-[10px] font-semibold uppercase tracking-wide text-slate-muted dark:border-gray-600 dark:text-gray-400"
					>
						{pkg.license}
					</span>
				{/if}
				{#if isInsecure}
					<span
						class="inline-flex items-center gap-0.5 rounded bg-error-container/40 px-1.5 py-0.5 text-[10px] font-semibold text-on-error-container dark:bg-red-900/30 dark:text-red-200"
						title="Flagged as insecure by npm"
					>
						<span class="material-symbols-outlined text-[12px]">warning</span>
						Insecure
					</span>
				{/if}
			</span>
		</button>
		{#if publisherName}
			<span
				class="shrink-0 truncate font-body-sm text-body-sm text-slate-muted dark:text-gray-400"
				title="@{publisherName}"
			>
				@{publisherName}
			</span>
		{/if}
	</div>

	{#if weeklyDownloads || monthlyDownloads || dependentsCount || updatedLabel}
		<div
			class="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 font-body-sm text-body-sm text-slate-muted dark:text-gray-400"
		>
			{#if weeklyDownloads}
				<span title={monthlyDownloads ? `${monthlyDownloads}/mo downloads` : undefined}>
					<span class="material-symbols-outlined align-middle text-[14px]">download</span>
					{weeklyDownloads}/wk
				</span>
			{/if}
			{#if monthlyDownloads && weeklyDownloads}
				<span class="text-slate-muted/60 dark:text-gray-500" aria-hidden="true">·</span>
				<span class="hidden sm:inline" title="Monthly downloads">{monthlyDownloads}/mo</span>
			{:else if monthlyDownloads}
				<span>
					<span class="material-symbols-outlined align-middle text-[14px]">download</span>
					{monthlyDownloads}/mo
				</span>
			{/if}
			{#if dependentsCount}
				{#if weeklyDownloads || monthlyDownloads}
					<span class="text-slate-muted/60 dark:text-gray-500" aria-hidden="true">·</span>
				{/if}
				<span title="Packages that depend on this">
					<span class="material-symbols-outlined align-middle text-[14px]">account_tree</span>
					{dependentsCount} deps
				</span>
			{/if}
			{#if updatedLabel}
				{#if weeklyDownloads || monthlyDownloads || dependentsCount}
					<span class="text-slate-muted/60 dark:text-gray-500" aria-hidden="true">·</span>
				{/if}
				<span title="Registry index last updated">
					<span class="material-symbols-outlined align-middle text-[14px]">schedule</span>
					{updatedLabel}
				</span>
			{/if}
		</div>
	{/if}

	{#if pkg.description}
		<p class="mt-1 line-clamp-2 font-body-sm text-body-sm text-slate-muted dark:text-gray-400">
			{pkg.description}
		</p>
	{/if}

	<div class="mt-2 flex flex-wrap items-center gap-1">
		<span
			class="rounded-full bg-primary-fixed px-2 py-0.5 text-[10px] font-semibold text-on-primary-fixed-variant"
			title="Quality score"
		>
			Q {qualityPercent}
		</span>
		<span
			class="rounded-full bg-primary-fixed px-2 py-0.5 text-[10px] font-semibold text-on-primary-fixed-variant"
			title="Popularity score"
		>
			P {popularityPercent}
		</span>
		<span
			class="rounded-full bg-primary-fixed px-2 py-0.5 text-[10px] font-semibold text-on-primary-fixed-variant"
			title="Maintenance score"
		>
			M {maintenancePercent}
		</span>
		{#each displayKeywords as keyword}
			<span
				class="rounded border border-surface-border px-1.5 py-0.5 text-[10px] text-slate-muted dark:border-gray-600 dark:text-gray-400"
			>
				{keyword}
			</span>
		{/each}
	</div>

	<div class="group/code relative mt-2">
		<div
			class="rounded border border-surface-border bg-code-bg py-1.5 pl-3 pr-9 font-code-snippet text-xs text-slate-text dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
		>
			<code class="text-inherit">{primaryCommand}</code>
		</div>
		<button
			type="button"
			data-testid="search-copy-install"
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
			data-testid="search-view-package"
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

		<div class="flex items-center gap-0.5">
			{#if pkg.links?.npm}
				<a
					href={pkg.links.npm}
					target="_blank"
					rel="noopener noreferrer"
					data-testid="search-open-npm"
					class="interactive-press inline-flex items-center justify-center rounded-md border border-surface-border p-1 text-slate-muted transition-colors hover:border-primary/30 hover:text-primary dark:border-gray-600 dark:text-gray-400"
					aria-label="Open on npm"
					title="npm"
				>
					<span class="material-symbols-outlined text-[16px]">inventory_2</span>
				</a>
			{/if}
			{#if repositoryUrl}
				<a
					href={repositoryUrl}
					target="_blank"
					rel="noopener noreferrer"
					data-testid="search-open-repository"
					class="interactive-press inline-flex items-center justify-center rounded-md border border-surface-border p-1 text-slate-muted transition-colors hover:border-primary/30 hover:text-primary dark:border-gray-600 dark:text-gray-400"
					aria-label="Open repository"
					title="Repository"
				>
					<span class="material-symbols-outlined text-[16px]">code</span>
				</a>
			{/if}
			{#if pkg.links?.homepage}
				<a
					href={pkg.links.homepage}
					target="_blank"
					rel="noopener noreferrer"
					data-testid="search-open-homepage"
					class="interactive-press inline-flex items-center justify-center rounded-md border border-surface-border p-1 text-slate-muted transition-colors hover:border-primary/30 hover:text-primary dark:border-gray-600 dark:text-gray-400"
					aria-label="Open homepage"
					title="Homepage"
				>
					<span class="material-symbols-outlined text-[16px]">language</span>
				</a>
			{/if}
			<button
				type="button"
				data-testid="search-copy-name"
				class="interactive-press inline-flex items-center justify-center rounded-md border border-surface-border p-1 text-slate-muted transition-colors hover:border-primary/30 hover:text-primary dark:border-gray-600 dark:text-gray-400"
				aria-label="Copy package name"
				title="Copy name"
				on:click|stopPropagation={copyPackageName}
			>
				<span class="material-symbols-outlined text-[16px]">badge</span>
			</button>
			<button
				type="button"
				data-testid="search-copy-coordinate"
				class="interactive-press inline-flex items-center justify-center rounded-md border border-surface-border p-1 text-slate-muted transition-colors hover:border-primary/30 hover:text-primary dark:border-gray-600 dark:text-gray-400"
				aria-label="Copy package coordinate"
				title="Copy name@version"
				on:click|stopPropagation={copyCoordinate}
			>
				<span class="material-symbols-outlined text-[16px]">tag</span>
			</button>
		</div>

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
</article>

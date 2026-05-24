<script lang="ts">
	import type { SearchObject } from '$lib/types/Results';
	import { formatDistance } from 'date-fns';
	import { Drawer, CloseButton, Spinner } from 'flowbite-svelte';
	import { sineIn } from 'svelte/easing';
	import { onMount, createEventDispatcher } from 'svelte';
	import { packageManager } from '$lib/stores/packageManager';
	import {
		buildInstallCommand,
		copyInstallCommand,
		getPackageManagers
	} from '$lib/utils/installCommand';
	import { formatCount, parseRepositoryUrl } from '$lib/utils/packageStats';
	import Markdown from './Markdown.svelte';
	import Links from '$lib/Shared/Links.svelte';
	import LastUpdated from '$lib/Shared/LastUpdated.svelte';
	import AddToBag from '$lib/Shared/AddToBag.svelte';

	export let item: SearchObject;

	let loading = false;
	let result: {
		description?: string;
		readme?: string;
		distTags: { name: string; value: string }[];
	};
	let hidden = false;
	let isDevDependency = false;

	const managers = getPackageManagers();
	const transitionParamsRight = {
		x: 480,
		duration: 200,
		easing: sineIn
	};

	$: pkg = item.package;
	$: primaryCommand = buildInstallCommand(pkg, $packageManager, isDevDependency);
	$: repositoryUrl = parseRepositoryUrl(pkg.links?.repository);
	$: weeklyDownloads = formatCount(item.downloads?.weekly);
	$: monthlyDownloads = formatCount(item.downloads?.monthly);
	$: dependentsCount = formatCount(item.dependents);
	$: updatedLabel = item.updated
		? formatDistance(new Date(item.updated), new Date(), { addSuffix: true })
		: null;
	$: isInsecure = Boolean(item.flags?.insecure);
	$: publisherName = pkg.publisher?.username;
	$: description = result?.description ?? pkg.description;

	onMount(() => {
		fetchDetails();
		history.pushState('', pkg.name, `/search?q=${encodeURIComponent(pkg.name)}`);
	});

	async function fetchDetails() {
		loading = true;
		const url = `https://registry.npmjs.com/${pkg.name}`;
		const res = await fetch(url);
		const data = await res.json();
		result = {
			...data,
			distTags: Object.entries(data['dist-tags'] ?? {}).map(([name, value]) => ({
				name,
				value: String(value)
			}))
		};
		loading = false;
	}

	const dispatch = createEventDispatcher();

	const drawerClosed = () => {
		history.back();
		dispatch('closed');
	};

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

<Drawer
	placement="right"
	width=""
	transitionType="fly"
	transitionParams={transitionParamsRight}
	bind:hidden
	on:hide={drawerClosed}
	id="package-details-drawer"
	data-testid="package-details-drawer"
	divClass="package-details-drawer-inner flex h-full flex-col overflow-hidden border-l border-surface-border bg-surface-container-lowest p-0 dark:border-gray-700 dark:bg-gray-800"
	class="!fixed top-16 bottom-0 right-0 z-[210] flex w-full max-w-full flex-col overflow-hidden sm:!w-[min(100%,42rem)] lg:!w-[min(800px,55vw)]"
>
	<header
		class="sticky top-0 z-10 shrink-0 border-b border-surface-border bg-surface-container-lowest px-4 py-4 dark:border-gray-700 dark:bg-gray-800"
	>
		<div class="flex items-start justify-between gap-3">
			<div class="min-w-0 flex-1">
				<div class="flex flex-wrap items-center gap-x-2 gap-y-1">
					<h2 class="font-headline-lg text-headline-lg text-slate-text dark:text-gray-100">
						{pkg.name}
					</h2>
					<span class="text-sm text-slate-muted dark:text-gray-400">v{pkg.version}</span>
					{#if pkg.license}
						<span
							class="rounded border border-surface-border px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-muted dark:border-gray-600 dark:text-gray-400"
						>
							{pkg.license}
						</span>
					{/if}
					{#if isInsecure}
						<span
							class="inline-flex items-center gap-0.5 rounded bg-error-container/40 px-1.5 py-0.5 text-[10px] font-semibold text-on-error-container dark:bg-red-900/30 dark:text-red-200"
						>
							<span class="material-symbols-outlined text-[12px]">warning</span>
							Insecure
						</span>
					{/if}
				</div>
				{#if publisherName}
					<p class="mt-0.5 truncate font-body-sm text-body-sm text-slate-muted dark:text-gray-400">
						@{publisherName}
					</p>
				{/if}
			</div>
			<CloseButton
				data-testid="package-details-close"
				on:click={() => (hidden = true)}
				class="shrink-0 text-slate-muted hover:text-primary dark:text-gray-400"
			/>
		</div>

		{#if weeklyDownloads || monthlyDownloads || dependentsCount || updatedLabel}
			<div
				class="mt-2 flex flex-wrap items-center gap-x-2 gap-y-0.5 font-body-sm text-body-sm text-slate-muted dark:text-gray-400"
			>
				{#if weeklyDownloads}
					<span title={monthlyDownloads ? `${monthlyDownloads}/mo downloads` : undefined}>
						<span class="material-symbols-outlined align-middle text-[14px]">download</span>
						{weeklyDownloads}/wk
					</span>
				{/if}
				{#if monthlyDownloads}
					{#if weeklyDownloads}
						<span class="text-slate-muted/60 dark:text-gray-500" aria-hidden="true">·</span>
					{/if}
					<span class="hidden sm:inline">{monthlyDownloads}/mo</span>
				{/if}
				{#if dependentsCount}
					<span class="text-slate-muted/60 dark:text-gray-500" aria-hidden="true">·</span>
					<span>
						<span class="material-symbols-outlined align-middle text-[14px]">account_tree</span>
						{dependentsCount} deps
					</span>
				{/if}
				{#if updatedLabel}
					<span class="text-slate-muted/60 dark:text-gray-500" aria-hidden="true">·</span>
					<span>
						<span class="material-symbols-outlined align-middle text-[14px]">schedule</span>
						{updatedLabel}
					</span>
				{/if}
			</div>
		{/if}

		{#if description}
			<p class="mt-2 line-clamp-2 font-body-sm text-body-sm text-slate-muted dark:text-gray-400">
				{description}
			</p>
		{/if}

		<div class="group/code relative mt-3">
			<div
				class="rounded border border-surface-border bg-code-bg py-2 pl-3 pr-10 font-code-snippet text-sm text-slate-text dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
			>
				<code class="text-inherit">{primaryCommand}</code>
			</div>
			<button
				type="button"
				data-testid="package-details-copy-install"
				class="absolute right-2 top-1/2 -translate-y-1/2 text-slate-muted transition-colors hover:text-primary"
				aria-label="Copy install command"
				on:click={copyPrimary}
			>
				<span class="material-symbols-outlined text-[20px]">content_copy</span>
			</button>
		</div>

		<label
			class="mt-2 inline-flex cursor-pointer items-center gap-1.5 font-body-sm text-body-sm text-slate-muted dark:text-gray-400"
		>
			<input
				type="checkbox"
				bind:checked={isDevDependency}
				class="h-4 w-4 rounded border-surface-border text-primary focus:ring-primary"
			/>
			Dev dependency
		</label>

		<div class="mt-3 flex flex-wrap items-center gap-2">
			<AddToBag row={pkg} />

			{#if pkg.links?.npm}
				<a
					href={pkg.links.npm}
					target="_blank"
					rel="noopener noreferrer"
					class="interactive-press inline-flex items-center gap-1 rounded-md border border-surface-border px-2 py-1 text-xs text-slate-text transition-colors hover:border-primary/30 hover:text-primary dark:border-gray-600 dark:text-gray-200"
				>
					<span class="material-symbols-outlined text-[16px]">inventory_2</span>
					npm
				</a>
			{/if}
			{#if repositoryUrl}
				<a
					href={repositoryUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="interactive-press inline-flex items-center gap-1 rounded-md border border-surface-border px-2 py-1 text-xs text-slate-text transition-colors hover:border-primary/30 hover:text-primary dark:border-gray-600 dark:text-gray-200"
				>
					<span class="material-symbols-outlined text-[16px]">code</span>
					Repo
				</a>
			{/if}
			{#if pkg.links?.homepage}
				<a
					href={pkg.links.homepage}
					target="_blank"
					rel="noopener noreferrer"
					class="interactive-press inline-flex items-center gap-1 rounded-md border border-surface-border px-2 py-1 text-xs text-slate-text transition-colors hover:border-primary/30 hover:text-primary dark:border-gray-600 dark:text-gray-200"
				>
					<span class="material-symbols-outlined text-[16px]">language</span>
					Home
				</a>
			{/if}

			<div
				class="ml-auto flex rounded-md border border-surface-border bg-surface-container-low p-0.5 dark:border-gray-600 dark:bg-gray-900"
			>
				{#each managers as manager}
					<button
						type="button"
						class="rounded px-2 py-1 text-[10px] font-semibold uppercase tracking-wide transition-colors {$packageManager ===
						manager
							? 'bg-primary text-on-primary'
							: 'text-secondary hover:text-primary dark:text-gray-400'}"
						on:click={() => handleManagerClick(manager)}
					>
						{manager}
					</button>
				{/each}
			</div>
		</div>
	</header>

	<div class="flex-1 overflow-y-auto px-4 pb-6">
		{#if loading}
			<div class="flex flex-col gap-4 py-6">
				<div class="flex justify-center">
					<Spinner size="8" color="primary" />
				</div>
				<p class="text-center font-body-sm text-body-sm text-slate-muted dark:text-gray-400">
					Loading README and versions…
				</p>
				<div class="space-y-3">
					{#each Array(4) as _}
						<div class="h-4 animate-pulse rounded bg-surface-container dark:bg-gray-700"></div>
					{/each}
				</div>
			</div>
		{:else if result}
			<div class="py-stack-md text-left">
				<div class="mb-stack-md">
					<div class="mb-stack-sm font-label-caps text-label-caps text-slate-muted">Versions</div>
					<div class="flex flex-wrap gap-2">
						{#each result.distTags as tag}
							<div
								class="rounded border border-surface-border bg-surface-container px-3 py-2 dark:border-gray-600 dark:bg-gray-900"
							>
								<div class="text-xs text-slate-muted dark:text-gray-400">{tag.name}</div>
								<div class="font-code-snippet text-body-sm text-slate-text dark:text-gray-200">
									{tag.value}
								</div>
							</div>
						{/each}
					</div>
				</div>

				<div
					class="flex flex-col gap-stack-sm border-t border-surface-border pt-stack-md dark:border-gray-700"
				>
					<LastUpdated value={pkg.date} />
					<Links row={pkg} />
				</div>
			</div>

			{#if result.readme}
				<div
					class="markdown-block border-t border-surface-border py-stack-md text-left dark:border-gray-700"
				>
					<Markdown source={result.readme} />
				</div>
			{:else}
				<p class="border-t border-surface-border py-stack-md font-body-sm text-body-sm text-slate-muted dark:border-gray-700 dark:text-gray-400">
					No README published for this package.
				</p>
			{/if}
		{/if}
	</div>
</Drawer>

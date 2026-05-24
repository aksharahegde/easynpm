import type { Package } from '$lib/types/Results';
import { packageManagerCommands, type PackageManager } from '$lib/stores/packageManager';
import { notifications } from '$lib/stores/notifications';
import CopyToClipboard from '$lib/Shared/CopyToClipboard.svelte';

const managerVerbs: Record<string, string> = {
	...packageManagerCommands,
	bun: 'add'
};

export function buildInstallCommand(
	pkg: Package,
	manager: string,
	isDevDependency = false
): string {
	const verb = managerVerbs[manager] ?? 'install';
	return `${manager} ${verb}${isDevDependency ? ' -D' : ''} ${pkg.name}@${pkg.version}`;
}

export function copyText(val: string, message?: string): void {
	const target = document.getElementById('clipboard');
	if (!target) return;

	const app = new CopyToClipboard({
		target,
		props: { val }
	});
	app.$destroy();
	notifications.success(message ?? `${val} copied to clipboard`, 1000);
}

export function copyInstallCommand(
	pkg: Package,
	manager: string,
	isDevDependency = false
): void {
	const val = buildInstallCommand(pkg, manager, isDevDependency);
	copyText(val, `${val} copied to clipboard`);
}

export function getPackageManagers(): (PackageManager | 'bun')[] {
	return ['npm', 'yarn', 'pnpm', 'bun'];
}

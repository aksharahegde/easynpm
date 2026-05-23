import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export type PackageManager = 'npm' | 'yarn' | 'pnpm';

const STORAGE_KEY = 'easynpm-package-manager';

function readStored(): PackageManager {
	if (!browser) return 'npm';
	const stored = localStorage.getItem(STORAGE_KEY);
	if (stored === 'yarn' || stored === 'pnpm' || stored === 'npm') {
		return stored;
	}
	return 'npm';
}

function createPackageManagerStore() {
	const { subscribe, set, update } = writable<PackageManager>(readStored());

	return {
		subscribe,
		set: (value: PackageManager) => {
			if (browser) {
				localStorage.setItem(STORAGE_KEY, value);
			}
			set(value);
		},
		select: (value: PackageManager) => {
			if (browser) {
				localStorage.setItem(STORAGE_KEY, value);
			}
			set(value);
		}
	};
}

export const packageManager = createPackageManagerStore();

export const packageManagerCommands: Record<PackageManager, string> = {
	npm: 'install',
	yarn: 'add',
	pnpm: 'install'
};

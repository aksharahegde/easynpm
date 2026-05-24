export function formatCount(value: number | string | undefined): string | null {
	if (value === undefined || value === null || value === '') return null;
	const n = typeof value === 'string' ? Number(value) : value;
	if (!Number.isFinite(n) || n < 0) return null;
	if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1).replace(/\.0$/, '')}B`;
	if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
	if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, '')}k`;
	return String(Math.round(n));
}

export function formatScorePercent(value: number | undefined): number {
	if (value === undefined || !Number.isFinite(value)) return 0;
	const normalized = value <= 1 ? value * 100 : value;
	return Math.min(100, Math.max(0, Math.round(normalized)));
}

export function parseRepositoryUrl(repository: string | undefined): string | null {
	if (!repository) return null;
	const trimmed = repository.trim();
	if (!trimmed) return null;
	if (trimmed.startsWith('git+')) return trimmed.slice(4);
	if (trimmed.startsWith('git://')) {
		const path = trimmed.slice(6);
		return `https://${path.replace(/\.git$/, '')}`;
	}
	if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
		return trimmed.replace(/\.git$/, '');
	}
	return trimmed;
}

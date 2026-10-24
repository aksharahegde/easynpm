<script lang="ts">
	import { formatDistance } from 'date-fns';

	interface Props {
		value: string;
	}

	let { value }: Props = $props();
	const lastUpdatedDuration = $derived(formatDistance(new Date(value), new Date()));
</script>

<span class="whitespace-nowrap font-body-sm text-body-sm text-slate-muted dark:text-gray-400">
	Last updated {lastUpdatedDuration} ago
</span>

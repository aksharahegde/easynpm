<script lang="ts">
	import { formatDistance } from 'date-fns';

	export let value: string;
	const lastUpdatedDuration = formatDistance(new Date(value), new Date());
</script>

<span class="whitespace-nowrap font-body-sm text-body-sm text-slate-muted dark:text-gray-400">
	Last updated {lastUpdatedDuration} ago
</span>

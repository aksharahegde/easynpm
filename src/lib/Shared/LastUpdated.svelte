<script lang="ts">
	import { formatDistance } from 'date-fns';

    export let value: string;
	const lastUpdatedDuration = formatDistance(new Date(value), new Date());
</script>
<span class="text-sm text-gray-600 whitespace-nowrap dark:text-gray-400">Last updated: {lastUpdatedDuration} ago</span>

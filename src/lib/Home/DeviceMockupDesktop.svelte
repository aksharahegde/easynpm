<script>
	import { DeviceMockup } from 'flowbite-svelte';
</script>

<DeviceMockup device="laptop">
	<img
		src="/search_result_light.png"
		class="dark:hidden h-[156px] md:h-[278px] w-full rounded-xl"
		alt="laptop example 1"
	/>
	<img
		src="/search_result_dark.png"
		class="hidden dark:block h-[156px] md:h-[278px] w-full rounded-lg"
		alt="laptop example 2"
	/>
</DeviceMockup>
1
<script lang="ts">
	import { Button, Img, Tooltip } from 'flowbite-svelte';
	let placement: string | null = null;

	const displayText = (e: any) => {
		const manager = e?.target?.id.replace('placement-', '').replaceAll('_', ' ');
        placement = `${manager} {package}@{version}`;
	};
</script>

<div class="py-16">
	<div class="container px-6 m-auto space-y-8 text-gray-500 md:px-12 lg:px-20">
		<div class="gap-6 justify-center text-center md:flex md:text-left lg:items-center lg:gap-16">
			<div class="order-last mb-6 space-y-6 md:mb-0 md:w-6/12 lg:w-6/12">
				<h1 class="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
					One-click <span class="text-primary dark:text-sky-300">Copy / Bag</span>
				</h1>
				<p class="text-lg text-gray-600 dark:text-gray-300">
					Copy the installation command to your clipboard <br class="hidden md:block"/> or add to your bag with one click.
				</p>
				<div class="flex flex-wrap gap-6">
					<Button id="placement-yarn_add" color="alternative">yarn</Button>
					<Button id="placement-npm_install" color="alternative">npm</Button>
					<Button id="placement-pnpm_install" color="alternative">pnpm</Button>
					<Tooltip
						triggeredBy="[id^='placement-']"
						placement="bottom"
						arrow={false}
						on:show={displayText}
					>
						<span class="text-xs whitespace-nowrap">{placement}</span>
					</Tooltip>
				</div>
			</div>
			<div class="grid relative grid-cols-5 grid-rows-4 gap-4 md:w-5/12 lg:w-6/12">
				
				<div class="col-span-3 row-span-3">
					<Img
						src="/one_click_light.png"
						alt="advanced filter"
						loading="lazy"
						class="block object-contain object-bottom w-full rounded-xl border border-gray-300 shadow-lg h-fit dark:hidden"
					/>
                    <Img
						src="/one_click_dark.png"
						alt="advanced filter"
						loading="lazy"
						class="hidden object-contain object-bottom w-full h-full rounded-xl dark:block"
					/>
				</div>
                <div class="col-span-2 row-span-3">
					<Img
						src="/bag_light.png"
						alt="advanced filter"
						loading="lazy"
						class="block object-cover object-top w-full h-full rounded-xl border border-gray-300 shadow-lg dark:hidden"
					/>
                    <Img
						src="/bag_dark.png"
						alt="advanced filter"
						loading="lazy"
						class="hidden object-cover object-top w-full h-full rounded-xl dark:block"
					/>
				</div>
			</div>
		</div>
	</div>
</div>

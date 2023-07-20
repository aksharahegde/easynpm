<script lang="ts">
	import '../app.css';
	import { DarkMode } from 'flowbite-svelte';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
	import { SearchSolid } from 'flowbite-svelte-icons';

	import { page } from '$app/stores';
	let path: string;

	function getPath(currentPath: string) {
		path = currentPath;
	}

	$: getPath($page.url.pathname);
</script>

<Navbar let:hidden let:toggle>
	<NavBrand href="/" class="relative gap-4">
		<span class="self-center text-xl font-semibold whitespace-nowrap text-primary-600">
			Easy
		</span>
		<SearchSolid size="sm" class="absolute top-1/2 left-1/2 opacity-40 -translate-x-1/2 -translate-y-1/2" />
		<span class="self-center text-xl font-semibold whitespace-nowrap text-primary-600">
			NPM
		</span>
	</NavBrand>
	<div class="flex md:order-2">
		<DarkMode size="sm" class="text-base" />
		<NavHamburger on:click={toggle} />
	</div>
	<NavUl {hidden} class="order-1">
		<NavLi href="/" active={path === '/'}>Home</NavLi>
		<NavLi href="/search" active={path === '/search'}>Search</NavLi>
		<NavLi href="/about" active={path === '/about'}>About</NavLi>
	</NavUl>
</Navbar>
<slot />

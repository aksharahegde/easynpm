<script lang="ts">
	import '../app.css';
	import {
		DarkMode,
		Img,
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Footer,
		FooterCopyright,
		FooterLinkGroup,
		FooterLink
	} from 'flowbite-svelte';
	import { page } from '$app/stores';
	import Bag from '$lib/Shared/Bag.svelte';

	let path: string;

	function getPath(currentPath: string) {
		path = currentPath;
	}

	$: getPath($page.url.pathname);
</script>

<div class="relative">
	<Navbar
		let:hidden
		let:toggle
		navClass="px-2 sm:px-4 py-2.5 sticky w-full z-20 top-0 left-0 border-b bg-white dark:bg-gray-800 dark:border-gray-700"
	>
		<NavBrand href="/" class="relative gap-4">
			<Img src="/logo.svg" alt="Easy NPM Logo" size="w-12" />
		</NavBrand>
		<div class="flex items-center space-x-4 md:order-2">
			<Bag />
			<DarkMode />
			<NavHamburger on:click={toggle} />
		</div>
		<NavUl {hidden} class="order-1">
			<NavLi href="/" active={path === '/'}>Home</NavLi>
			<NavLi href="/search" active={path === '/search'}>Search</NavLi>
		</NavUl>
	</Navbar>
	<slot />
</div>

<Footer class="bg-gray-50 border-t border-gray-300 dark:border-gray-600 dark:bg-gray-900">
	<FooterCopyright href="/" by="Easy NPM" year={new Date().getFullYear()} />
	<FooterLinkGroup
		ulClass="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0"
	>
		<FooterLink href="https://github.com/aksharahegde/easynpm" target="_blank">GitHub</FooterLink>
		<FooterLink href="https://aksharahegde.xyz" target="_blank"
			>Developed by <span class="font-semibold text-primary-600">Akshara Hegde</span></FooterLink
		>
	</FooterLinkGroup>
</Footer>

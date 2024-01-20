<script lang="ts">
import '../app.pcss';
	//Import components
	import {navbarHidden} from '$lib/stores/navbar'
	import * as Card from '$lib/components/ui/card';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	//Import icons
	import { Sun, Moon, Menu } from 'lucide-svelte';
	//Import darkMode
	import { ModeWatcher } from 'mode-watcher';
	import { toggleMode } from 'mode-watcher';

	//NavMenu
	let NavMenu: string[][] = [['Home','/PasswordGenerator'],['About', '/PasswordGenerator/about']];
	$navbarHidden = false;
</script>

<div class="centered">
	<Card.Root class="mx-auto max-w-screen-md overflow-auto drop-shadow-lg">
		<Card.Header class="bg-slate-400 drop-shadow-lg">
			<Card.Title class="text-black">Password Generator v 0.2.0.3</Card.Title>
			<Card.Description class="text-black">A webbased Password Generator</Card.Description>
			<ModeWatcher />
			{#if $navbarHidden == false}
				<div class="border-b">
					<div class="flex h-16 items-center px-4">
						<DropdownMenu.Root>
							<DropdownMenu.Trigger asChild let:builder>
								<Button variant="ghost" builders={[builder]} class="relative h-8 w-8 color-black">
									<Avatar.Root class="h-8 w-8">
										<Menu class="h-full w-full" />
									</Avatar.Root>
								</Button>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content class="w-56" align="end">
								<DropdownMenu.Separator />
								<DropdownMenu.Group>
									{#each NavMenu as NavMenuItem}
									<a href={NavMenuItem[1]}> <DropdownMenu.Item>{NavMenuItem[0]}</DropdownMenu.Item></a>
									{/each}
								</DropdownMenu.Group>
							</DropdownMenu.Content>
						</DropdownMenu.Root>
						<div class="ml-auto flex items-center space-x-4">
							<Button on:click={toggleMode} variant="outline" size="icon" class="drop-shadow-lg">
								<Sun
									class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
								/>
								<Moon
									class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
								/>
								<span class="sr-only">Toggle theme</span>
							</Button>
						</div>
					</div>
				</div>
			{/if}
		</Card.Header>
		<Card.Content class="drop-shadow-lg">
			
			<slot />
		</Card.Content>
		<Card.Footer>
			<Card.Description
				>Build and maintained by HofmanICT © 2024, MIT licensed 2024</Card.Description
			>
		</Card.Footer>
	</Card.Root>
</div>

<style>
	.centered {
		text-align: center;
		margin-top: 1rem;
	}
</style>

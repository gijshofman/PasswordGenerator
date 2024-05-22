<script lang="ts">
	//Import dependencies

	//Import components
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import { Label } from '$lib/components/ui/label';
	import Input from '$lib/components/ui/input/input.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { onMount } from 'svelte';
	import { Copy } from 'lucide-svelte';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';

	$: UpperCase = true;
	$: Numbers = true;
	$: ExcludeSimilar = true;
	$: Symbols = false;
	$: SimpleSymbols = true;
	$: AmountPasswords = 5;
	$: PasswordLength = 12;

	let ListOfPasswords: string[] = [];

	onMount(() => {
		generatePasswords(
			AmountPasswords,
			PasswordLength,
			UpperCase,
			Numbers,
			ExcludeSimilar,
			Symbols,
			SimpleSymbols
		);
	});

	async function clearAndRegenerate() {
		ListOfPasswords = [];
		await new Promise((f) => setTimeout(f, 1000));
		generatePasswords(
			AmountPasswords,
			PasswordLength,
			UpperCase,
			Numbers,
			ExcludeSimilar,
			Symbols,
			SimpleSymbols
		);
	}

	function HandleReset() {
		location.reload();
	}

	// Password Scripts
	function arrayFromLowToHigh(low: number, high: number) {
		const array = [];
		for (let i = low; i <= high; i++) {
			array.push(i);
		}
		return array;
	}

	function removeItemsFromArray(array: any[], value: any[]) {
		for (let i = 0; i < value.length; i++) {
			let index = array.indexOf(value[i]);

			if (index != -1) array.splice(index, 1);
		}
	}

	const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90);
	const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122);
	const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57);
	const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 33)
		.concat(arrayFromLowToHigh(35, 36))
		.concat(arrayFromLowToHigh(38, 38))
		.concat(arrayFromLowToHigh(42, 42));
	const SIMPLE_SYMBOLS_CHAR_CODES = ['!', '@', '#', '$'];

	function generatePassword(
		characterAmount: number,
		includeUppercase: boolean,
		includeNumbers: boolean,
		ExcludeSimilar: boolean,
		includeSymbols: boolean,
		includeSimpleSymbols: boolean
	) {
		let charCodes = LOWERCASE_CHAR_CODES;
		if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES);
		if (includeNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CODES);
		if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CHAR_CODES);
		if (ExcludeSimilar) removeItemsFromArray(charCodes, [48, 49, 73, 79, 105, 108, 111]);

		const passwordCharacters = [];

		if (includeNumbers) {
			const numberCode = NUMBER_CHAR_CODES[Math.floor(Math.random() * NUMBER_CHAR_CODES.length)];
			passwordCharacters.push(String.fromCharCode(numberCode));
		}

		for (let i = passwordCharacters.length; i < characterAmount; i++) {
			const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)];
			passwordCharacters.push(String.fromCharCode(characterCode));
		}

		let NewPassword = passwordCharacters.join('');

		let HasSpecialChar = false;

		if (includeSymbols) {
			let pattern = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
			HasSpecialChar = pattern.test(NewPassword);
		}

		console.log(HasSpecialChar, includeSimpleSymbols)

		if (!HasSpecialChar && includeSimpleSymbols) {
			let randomIndex = Math.floor(Math.random() * characterAmount);
			let passwordArray = NewPassword.split('');
			passwordArray[randomIndex] =
				SIMPLE_SYMBOLS_CHAR_CODES[Math.floor(Math.random() * SIMPLE_SYMBOLS_CHAR_CODES.length)];
			NewPassword = passwordArray.join('');
		}

		return NewPassword;
	}

	function generatePasswords(
		amount: number,
		PasswordLength: number,
		UpperCase: boolean,
		Numbers: boolean,
		ExcludeSimilar: boolean,
		Symbols: boolean,
		SimpleSymbols: boolean
	) {
		for (let i = 0; i < amount; i++) {
			ListOfPasswords = [
				...ListOfPasswords,
				generatePassword(PasswordLength, UpperCase, Numbers, ExcludeSimilar, Symbols, SimpleSymbols)
			];
		}
	}

	function fallbackCopyTextToClipboard(text: string) {
		var textArea = document.createElement('textarea');
		textArea.value = text;

		// Avoid scrolling to bottom
		textArea.style.top = '0';
		textArea.style.left = '0';
		textArea.style.position = 'fixed';

		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();

		try {
			var successful = document.execCommand('copy');
			var msg = successful ? 'successful' : 'unsuccessful';
			console.log('Fallback: Copying text command was ' + msg);
		} catch (err) {
			console.error('Fallback: Oops, unable to copy', err);
		}

		document.body.removeChild(textArea);
	}

	function copyTextToClipboard(text: string) {
		if (!navigator.clipboard) {
			fallbackCopyTextToClipboard(text);
			return;
		}
		navigator.clipboard.writeText(text).then(
			function () {
				console.log('Async: Copying to clipboard was successful!');
			},
			function (err) {
				console.error('Async: Could not copy text: ', err);
			}
		);
	}
</script>

<Card.Root class="mx-auto w-full lg:max-w-screen-md">
	<Card.Content class="grid gap-4">
		{#if ListOfPasswords.length > 0}
			<div class="mt-2 flex space-x-2">
				{#if ListOfPasswords.length > 1}
					<Tooltip.Root>
						<Tooltip.Trigger>
							<Button
								on:click={() => copyTextToClipboard(ListOfPasswords.join('\n'))}
								variant="outline"
								size="icon"
								class="drop-shadow-lg"
							>
								<Copy className="h-4 w-4" />
							</Button>
						</Tooltip.Trigger>
						<Tooltip.Content>
							<p>Copy all passwords to the clipboard</p>
						</Tooltip.Content>
					</Tooltip.Root>
				{/if}
				<p>Your Password(s)</p>
			</div>
			<Card.Root>
				<Card.Content class="flex overflow-auto lg:max-h-80">
					<ul>
						{#each ListOfPasswords as Password}
							<div class="mt-2 flex justify-between space-x-2">
								<li>
									<Tooltip.Root>
										<Tooltip.Trigger>
											<Button
												on:click={() => copyTextToClipboard(Password)}
												variant="outline"
												size="icon"
												class="drop-shadow-lg"
											>
												<Copy className="h-4 w-4" />
											</Button>
										</Tooltip.Trigger>
										<Tooltip.Content>
											<p>Copy this password to the clipboard</p>
										</Tooltip.Content>
									</Tooltip.Root>
									{Password}
								</li>
							</div>
							<div class="mt-2 flex space-x-2">
								<Separator />
							</div>
						{/each}
					</ul>
				</Card.Content></Card.Root
			>
		{/if}

		<div class="mt-2 flex space-x-2">
			<p>amount characters</p>
			<Input type="number" bind:value={PasswordLength} on:change={clearAndRegenerate} />
		</div>
		<div class="mt-2 flex space-x-2">
			<p>amount of passwords</p>
			<Input type="number" bind:value={AmountPasswords} on:change={clearAndRegenerate} />
		</div>
		<div class="mt-2 flex space-x-2">
			<Tooltip.Root>
				<Tooltip.Trigger>
					<Checkbox
						id="UpperCase"
						bind:checked={UpperCase}
						on:click={clearAndRegenerate}
						aria-labelledby="UpperCase-label"
					/>
					<Label
						id="UpperCase-label"
						for="UpperCase"
						class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						UpperCase
					</Label>
				</Tooltip.Trigger>
				<Tooltip.Content>
					<p>Use uppercase characters like: ABCDEFG...</p>
				</Tooltip.Content>
			</Tooltip.Root>

			<Tooltip.Root>
				<Tooltip.Trigger>
					<Checkbox
						id="Numbers"
						bind:checked={Numbers}
						on:click={clearAndRegenerate}
						aria-labelledby="Numbers-label"
					/>

					<Label
						id="Numbers-label"
						for="Numbers"
						class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						Numbers
					</Label>
				</Tooltip.Trigger>
				<Tooltip.Content>
					<p>Use numbers like: 1234567890</p>
				</Tooltip.Content>
			</Tooltip.Root>
			<Tooltip.Root>
				<Tooltip.Trigger>
					<Checkbox
						id="ExcludeSimilar"
						bind:checked={ExcludeSimilar}
						on:click={clearAndRegenerate}
						aria-labelledby="ExcludeSimilar-label"
					/>
					<Label
						id="ExcludeSimilar-label"
						for="ExcludeSimilar"
						class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						Exclude Similar
					</Label>
				</Tooltip.Trigger>
				<Tooltip.Content>
					<p>Don't use difficult to distinguish characters like: 1lL and 0oO</p>
				</Tooltip.Content>
			</Tooltip.Root>
		</div>
		<div class="mt-2 flex space-x-2">
			<Tooltip.Root>
				<Tooltip.Trigger>
					<Checkbox
						id="SimpleSymbols"
						bind:checked={SimpleSymbols}
						on:click={clearAndRegenerate}
						aria-labelledby="SimpleSymbols-label"
					/>
					<Label
						id="SimpleSymbols-label"
						for="SimpleSymbols"
						class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						Simple Symbols
					</Label>
				</Tooltip.Trigger>
				<Tooltip.Content>
					<p>Use only simple symbols like: !@#</p>
				</Tooltip.Content>
			</Tooltip.Root>
			<Tooltip.Root>
				<Tooltip.Trigger>
					<Checkbox
						id="Symbols"
						bind:checked={Symbols}
						on:click={clearAndRegenerate}
						aria-labelledby="Symbols-label"
					/>
					<Label
						id="Symbols-label"
						for="Symbols"
						class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						Symbols
					</Label>
				</Tooltip.Trigger>
				<Tooltip.Content>
					<p>Use all symbols like: !@#$%&*_-/\</p>
				</Tooltip.Content>
			</Tooltip.Root>
		</div>
		<div class="mt-2 flex space-x-2">
			<Button variant={'outline'} class="drop-shadow-lg" on:click={clearAndRegenerate}
				>Generate Password(s)</Button
			>
			<Button variant={'outline'} class="drop-shadow-lg" on:click={HandleReset}>Reset</Button>
		</div>
	</Card.Content>
</Card.Root>

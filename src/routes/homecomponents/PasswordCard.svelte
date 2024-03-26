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

	$: UpperCase = true;
	$: Numbers = true;
	$: Excludeil1 = true;
	$: Symbols = false;
	$: Hashtag = true;
	$: AmountPasswords = 5;
	$: PasswordLength = 14;

	let ListOfPasswords: string[] = [];

	onMount(() => {
		generatePasswords(5, PasswordLength, UpperCase, Numbers, Excludeil1, Symbols, Hashtag);
	});

	function HandleGeneratePasswords() {
		generatePasswords(AmountPasswords, PasswordLength, UpperCase, Numbers, Excludeil1, Symbols, Hashtag);
	}

	function HandleReset() {
		location.reload();
	}

	async function HandleChangeOptions() {
		let currentPasswords = ListOfPasswords.length;
		ListOfPasswords = [];
		await new Promise(f => setTimeout(f, 1000));
		generatePasswords(currentPasswords, PasswordLength, UpperCase, Numbers, Excludeil1, Symbols, Hashtag);
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
		for(let i = 0; i < value.length; i++) {
			let index = array.indexOf(value[i]);

			if(index != -1)
				array.splice(index, 1);
		}
	}

	const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90);
	const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122);
	const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57);
	const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 33)
		.concat(arrayFromLowToHigh(35, 36))
		.concat(arrayFromLowToHigh(38, 38))
		.concat(arrayFromLowToHigh(42, 42));

	function generatePassword(
		characterAmount: number,
		includeUppercase: boolean,
		includeNumbers: boolean,
		excludeIl1: boolean,
		includeSymbols: boolean,
		includeHashtag: boolean
	) {
		let charCodes = LOWERCASE_CHAR_CODES;
		if (includeUppercase === true) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES);
		if (includeNumbers === true) charCodes = charCodes.concat(NUMBER_CHAR_CODES);
		if (includeSymbols === true) charCodes = charCodes.concat(SYMBOL_CHAR_CODES);
		if(excludeIl1) removeItemsFromArray(charCodes, [49, 73, 105, 108]);

		const passwordCharacters = [];

		for (let i = 0; i < characterAmount; i++) {
			const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)];
			passwordCharacters.push(String.fromCharCode(characterCode));
		}
		let NewPassword = passwordCharacters.join('');

		let HasSpecialChar = true;

		if (includeSymbols === true) {
			let pattern = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
			HasSpecialChar = pattern.test(NewPassword);
		}

		if (HasSpecialChar === false) {
			let passwordArray = NewPassword.split('');
			let randomItem = Math.floor(Math.random() * passwordArray.length);
			let characterCode2 = SYMBOL_CHAR_CODES[Math.floor(Math.random() * SYMBOL_CHAR_CODES.length)];
			passwordArray[randomItem] = String.fromCharCode(characterCode2);
			NewPassword = passwordArray.join('');
		}

		if(!includeSymbols && includeHashtag) {
			let randomIndex = Math.floor(Math.random() * characterAmount);
			let passwordArray = NewPassword.split('');
			passwordArray[randomIndex] = '#';
			NewPassword = passwordArray.join('');
		}

		return NewPassword;
	}

	function generatePasswords(
		amount: number,
		PasswordLength: number,
		UpperCase: boolean,
		Numbers: boolean,
		Excludeil1: boolean,
		Symbols: boolean,
		Hashtag: boolean
	) {
		for (let i = 0; i < amount; i++) {
			ListOfPasswords = [
				...ListOfPasswords,
				generatePassword(PasswordLength, UpperCase, Numbers, Excludeil1, Symbols, Hashtag)
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
					<Button
						on:click={() => copyTextToClipboard(ListOfPasswords.join('\n'))}
						variant="outline"
						size="icon"
						class="drop-shadow-lg"
					>
						<Copy className="h-4 w-4" />
					</Button>
				{/if}
				<p>Your Password(s)</p>
			</div>
			<Card.Root>
				<Card.Content class="flex overflow-auto lg:max-h-80">
					<ul>
						{#each ListOfPasswords as Password}
							<div class="mt-2 flex justify-between space-x-2">
								<li>
									<Button
										on:click={() => copyTextToClipboard(Password)}
										variant="outline"
										size="icon"
										class="drop-shadow-lg"
									>
										<Copy className="h-4 w-4" />
									</Button>
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
			<Input type="number" bind:value={PasswordLength} on:change={HandleChangeOptions} />
		</div>
		<div class="mt-2 flex space-x-2">
			<p>amount of passwords</p>
			<Input type="number" bind:value={AmountPasswords} on:change={HandleChangeOptions} />
		</div>
		<div class="mt-2 flex space-x-2">
			<Checkbox
				id="UpperCase"
				bind:checked={UpperCase}
				on:click={HandleChangeOptions}
				aria-labelledby="UpperCase-label"
			/>
			<Label
				id="UpperCase-label"
				for="UpperCase"
				class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
			>
				UpperCase
			</Label>
			<Checkbox
				id="Numbers"
				bind:checked={Numbers}
				on:click={HandleChangeOptions}
				aria-labelledby="Numbers-label"
			/>
			<Label
				id="Numbers-label"
				for="Numbers"
				class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
			>
				Numbers
			</Label>
			<Checkbox
				id="Excludeil1"
				bind:checked={Excludeil1}
				on:click={HandleChangeOptions}
				aria-labelledby="Excludeil1-label"
			/>
			<Label
				id="Excludeil1-label"
				for="Excludeil1"
				class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
			>
				Exclude i-l-1
			</Label>
		</div>
		<div class="mt-2 flex space-x-2">
			<Checkbox
				id="Symbols"
				bind:checked={Symbols}
				on:click={HandleChangeOptions}
				aria-labelledby="Symbols-label"
			/>
			<Label
				id="Symbols-label"
				for="Symbols"
				class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
			>
				Symbols
			</Label><Checkbox
				id="Hashtag"
				bind:checked={Hashtag}
				on:click={HandleChangeOptions}
				aria-labelledby="Hashtag-label"
			/>
			<Label
				id="Hashtag-label"
				for="Hashtag"
				class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
			>
				Hashtag
			</Label>
		</div>
		<div class="mt-2 flex space-x-2">
			<Button variant={'outline'} class="drop-shadow-lg" on:click={HandleGeneratePasswords}
				>Generate Password(s)</Button
			>
			<Button variant={'outline'} class="drop-shadow-lg" on:click={HandleReset}>Reset</Button>
		</div>
	</Card.Content>
</Card.Root>

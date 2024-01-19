<script lang="ts">
	//Import components
	import { navbarHidden } from '$lib/stores/navbar';

	//Import types
	import PasswordCard from './homecomponents/PasswordCard.svelte';

	$navbarHidden = false;
</script>

<div class="mt-4 gap-4 overflow-auto">
	<div>
		{#await Promise.resolve()}
			<div class="spinner"></div>
		{:then}
			<PasswordCard />
		{/await}
	</div>
</div>

<style>
</style>

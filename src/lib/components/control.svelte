<script lang="ts">
	import { appStore } from '$lib/store.svelte';
	import Select from './select.svelte';
	import { selectItems } from '$lib/constants';

  $inspect(appStore)
</script>

<div class="mx-auto grid w-full max-w-3xl grid-cols-4 gap-4 text-slate-100">
	{#each selectItems as { name, options }}
		<Select bind:value={appStore[name]} {name} {options} />
	{/each}
</div>

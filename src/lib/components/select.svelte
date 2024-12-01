<script lang="ts">
	type Option = {
		value: string;
		name: string | number;
	};

	type Props = {
		name: string;
		options: Option[];
		value: string;
	};

	let { name, options, value = $bindable() }: Props = $props();
	let sortedOptions = $derived(
		options.sort((a, b) => {
			if (typeof a.name === 'string' && typeof b.name === 'string') {
				return a.name.localeCompare(b.name);
			} else {
				return +a.name - +b.name;
			}
		})
	);
</script>

<label class="flex flex-col gap-1">
	<span class="text-sm capitalize">{name}</span>
	<select
		bind:value
		class="w-full rounded border-r-8 border-slate-800 bg-slate-800 px-2 py-1.5 capitalize text-slate-100"
	>
		{#each sortedOptions as option}
			<option value={option.value} class="capitalize">{option.name}</option>
		{/each}
	</select>
</label>

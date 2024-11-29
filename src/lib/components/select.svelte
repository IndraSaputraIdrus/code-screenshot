<script lang="ts">
	type Option = {
		value: string;
		name: string;
	};

	type Props = {
		name: string;
		options: Option[];
		value: string;
	};

	let { name, options, value = $bindable() }: Props = $props();
</script>

<label class="flex flex-col gap-1">
	<span class="text-sm capitalize">{name}</span>
	<select
		bind:value
		class="w-full rounded border-r-8 border-slate-800 bg-slate-800 px-2 py-1.5 capitalize text-slate-100"
	>
		{#each options as option}
			<option value={option.value} class="capitalize">{option.name}</option>
		{/each}
	</select>
</label>

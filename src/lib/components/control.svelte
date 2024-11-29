<script lang="ts">
	type Control = {
		label: string;
		options: { label: string; value: string }[];
	};

	const controls: Control[] = [
		{
			label: 'Language',
			options: [
				{ label: 'Javascript', value: 'javascript' },
				{ label: 'Typescrupt', value: 'typescript' },
				{ label: 'Python', value: 'python' }
			]
		},
		{
			label: 'Theme',
			options: [{ label: 'Github dark', value: 'github-dark' }]
		},
		{
			label: 'Background',
			options: [{ label: 'White', value: 'white' }]
		},
		{
			label: 'Padding',
			options: [{ label: 'Small', value: 'small' }]
		}
	];
</script>

<div class="mx-auto grid w-full max-w-3xl grid-cols-4 gap-4 text-slate-100">
	{#each controls as control}
		<label class="flex flex-col gap-1">
			<span class="text-sm">{control.label}</span>

			<select
				class="w-full rounded border-r-8 border-slate-800 bg-slate-800 px-2 py-1.5 text-slate-100"
			>
				{#each control.options as option}
					<option value={option.value}>{option.label}</option>
				{/each}
			</select>
		</label>
	{/each}
</div>

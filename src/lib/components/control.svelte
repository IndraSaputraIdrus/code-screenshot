<script lang="ts">
	import { backgrounds } from '$lib/constants';
	import { appStore, type Store } from '$lib/store.svelte';
	import Select from './select.svelte';

	type Items = {
		name: keyof Omit<Store, 'frame'>;
		options: { name: string; value: string }[];
	};

	const items: Items[] = [
		{
			name: 'language',
			options: [
				{ name: 'Javascript', value: 'javascript' },
				{ name: 'Typescript', value: 'typescript' },
				{ name: 'Python', value: 'python' }
			]
		},
		{
			name: 'theme',
			options: [{ name: 'Github dark', value: 'github-dark' }]
		},
		{
			name: 'background',
			options: backgrounds
		},
		{
			name: 'padding',
			options: [{ name: 'Small', value: 'small' }]
		}
	];

	$inspect(appStore);
</script>

<div class={`h-10 w-[100px]`}>bg</div>
<div class="mx-auto grid w-full max-w-3xl grid-cols-4 gap-4 text-slate-100">
	{#each items as { name, options }}
		<Select bind:value={appStore[name]} {name} {options} />
	{/each}
</div>

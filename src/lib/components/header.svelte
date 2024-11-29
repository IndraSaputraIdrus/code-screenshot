<script lang="ts">
	import { appStore } from '$lib/store.svelte';
	import { download } from '$lib/utils';
</script>

<header class="fixed inset-x-0 top-0 z-[9999] bg-slate-950 h-16 flex items-center">
	<div class="container mx-auto flex w-full items-center justify-between">
		<h1 class="font-mono text-2xl font-bold text-slate-100">CodeInx</h1>

		<button
			onclick={() => download(appStore.frame, appStore.title)}
			class="rounded bg-slate-100 px-4 py-2 font-semibold text-slate-950"
		>
			Save image
		</button>
	</div>
</header>

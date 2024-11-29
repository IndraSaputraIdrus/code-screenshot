<script lang="ts">
	import CodeEditor from '$lib/components/code-editor';
	import Frame from '$lib/components/frame.svelte';
	import { appStore } from '$lib/store.svelte';
	import { download } from '$lib/utils';

	$inspect(appStore);
</script>

<main class="h-svh bg-slate-950 px-5 py-10">
	<div class="flex h-full flex-col *:border *:border-red-500">
		<header class="text-white">CodeInx</header>
		<div class="grid grow place-content-center overflow-y-auto">
			<Frame>
				<CodeEditor bind:code={appStore.code} bind:title={appStore.title} />
			</Frame>
		</div>
		<div>
			<button onclick={() => download(appStore.frame, appStore.title)} class="bg-red-500 text-white"
				>Download</button
			>
		</div>
	</div>
</main>

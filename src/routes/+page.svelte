<script lang="ts">
	import CodeEditor from '$lib/components/code-editor';
	import Frame from '$lib/components/frame.svelte';
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
	import { appStore } from '$lib/store.svelte';
	import Control from '$lib/components/control.svelte';
</script>

<main class="h-full bg-slate-950 px-5">
	<div class="flex h-full flex-col">
		<Header />
		<div class="container mx-auto mt-16 flex w-full grow flex-col justify-start gap-10">
			<Control />
			<Frame>
				<CodeEditor bind:code={appStore.code} bind:title={appStore.title} />
			</Frame>
		</div>
		<Footer />
	</div>
</main>

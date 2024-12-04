<script lang="ts">
	import CodeEditor from '$lib/components/code-editor';
	import Frame from '$lib/components/frame.svelte';
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
	import { appStore } from '$lib/store.svelte';
	import Control from '$lib/components/control.svelte';
	import LoadingIcon from '$lib/components/loading-icon.svelte';

	let loading = $state(true);
</script>

<main class="h-full bg-slate-950 px-5">
	<div class="flex h-full flex-col">
		<Header />
		<div class="container mx-auto mt-16 flex w-full grow flex-col justify-start gap-10 pt-10">
			<Control />
			<div class="flex w-full items-center justify-center">
				<Frame>
					{#if loading}
						<LoadingIcon />
					{/if}
					<CodeEditor
						onLoad={() => {
							loading = false;
						}}
						lang={appStore.language}
						theme={appStore.theme}
						bind:code={appStore.code}
						bind:title={appStore.title}
					/>
				</Frame>
			</div>
		</div>
		<Footer />
	</div>
</main>

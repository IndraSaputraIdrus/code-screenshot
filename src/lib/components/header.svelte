<script lang="ts">
	import DownloadButton from './download-button.svelte';
</script>

<header class="fixed inset-x-0 top-0 z-[9999] flex h-16 items-center bg-slate-950">
	<div class="container mx-auto flex w-full items-center justify-between">
		<h1 class="font-mono text-2xl font-bold text-slate-100">CodeInx</h1>
		<DownloadButton />
	</div>
</header>

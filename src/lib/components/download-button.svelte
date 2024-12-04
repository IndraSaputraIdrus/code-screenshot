<script lang="ts">
	import { appStore } from '$lib/store.svelte';
	import { download } from '$lib/utils';
</script>

<button
	onclick={() => download(appStore.frame, appStore.title)}
	class="rounded bg-slate-100 px-4 py-2 font-semibold text-slate-950 transition hover:opacity-80 flex items-center gap-2"
 >
	<span>Save to png</span>
	<svg xmlns="http://www.w3.org/2000/svg" class='size-5' viewBox="0 0 24 24"
		><path
			fill="currentColor"
			d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm0-2h14V5H5zm1-2h12l-3.75-5l-3 4L9 13zm-1 2V5z"
		/></svg
	>
</button>

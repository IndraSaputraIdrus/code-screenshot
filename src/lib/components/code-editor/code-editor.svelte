<script lang="ts">
	import clsx from 'clsx';
	import javascript from 'highlight.js/lib/languages/javascript';
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';

	hljs.registerLanguage('javascript', javascript);

	let editor = $state({
		title: 'Untitled-1',
		code: `console.log('Hello world')`,
		lang: 'javascript'
	});

	let highlighterCode = $derived(
		hljs.highlight(editor.code, { language: 'javascript' }).value + '<br />'
	);
</script>

{#snippet heading()}
	<div class="grid grid-cols-[1fr_2fr_1fr] gap-4 border-b border-slate-500/50 px-5 py-4">
		<div class="flex items-center gap-2">
			{#each { length: 3 } as _}
				<span class="size-3 rounded-full bg-slate-500/50"></span>
			{/each}
		</div>
		<input
			type="text"
			spellcheck="false"
			autocomplete="off"
			autocapitalize="off"
			onclick={(e) => {
				e.currentTarget.select();
			}}
			bind:value={editor.title}
			class={clsx(
				'w-full justify-self-center bg-transparent text-center outline-none',
				'text-sm opacity-60'
			)}
		/>
	</div>
{/snippet}

{#snippet editors()}
	<div class="relative">
		<div class="relative inset-0 h-full w-full p-4 font-mono">
			{#if highlighterCode === '<br />'}
				<p class="text-slate-500">Type some code...</p>
			{:else}
				<pre>{@html highlighterCode}</pre>
			{/if}
		</div>
		<textarea
			tabindex="-1"
			autocomplete="off"
			spellcheck="false"
			autocapitalize="off"
			bind:value={editor.code}
			class={clsx(
				'absolute inset-0',
				'bg-transparent text-transparent caret-white',
				'font-mono',
				'p-4',
				'resize-none overflow-hidden focus:outline-none',
			)}
		></textarea>
	</div>
{/snippet}

<div
	class={clsx(
		'grid grid-cols-1',
		'mx-auto w-full min-w-[350px] max-w-2xl',
		'bg-slate-950 text-white',
		'rounded-lg',
		'border border-slate-500/50'
	)}
>
	{@render heading()}
	{@render editors()}
</div>

<script lang="ts">
	import clsx from 'clsx';
	import javascript from 'highlight.js/lib/languages/javascript';
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { tick } from 'svelte';

	hljs.registerLanguage('javascript', javascript);

	type Props = {
		code: string;
		title: string;
	};

	let { 
    code = $bindable(), 
    title = $bindable() 
  }: Props = $props();

	let highlighterCode = $derived(
		hljs.highlight(code, { language: 'javascript' }).value + '<br />'
	);

	function indentLine(text: string, start: number, end: number) {
		return `${text.slice(0, start)}\t${text.slice(end)}`;
	}

	function handleKeyDown(e: KeyboardEvent) {
		const target = e.target as HTMLTextAreaElement;
		const selectionStart = target.selectionStart;
		const selectionEnd = target.selectionEnd;

		if (e.key === 'Tab') {
			e.preventDefault();
			code = indentLine(code, selectionStart, selectionEnd);
			tick().then(() => {
				target.selectionStart = selectionStart + 1;
				target.selectionEnd = selectionStart + 1;
			});
		}
	}
</script>

{#snippet heading()}
	<div class="grid grid-cols-[1fr_2fr_1fr] gap-4 border-b border-slate-500/50 px-5 py-4">
		<div class="flex items-center gap-2">
			{#each { length: 3 } as _}
				<span class="size-3.5 rounded-full bg-slate-500/50"></span>
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
			bind:value={title}
			class={clsx(
				'w-full justify-self-center bg-transparent text-center outline-none',
				'text-sm text-slate-500',
				'font-mono font-bold'
			)}
		/>
	</div>
{/snippet}

{#snippet editors()}
	<div class="relative">
		<div class="relative inset-0 h-full w-full p-4 font-mono font-bold">
			{#if highlighterCode === '<br />'}
				<p class="text-slate-500">Type some code...</p>
			{:else}
				<pre>{@html highlighterCode}</pre>
			{/if}
		</div>
		<textarea
			onkeydown={handleKeyDown}
			onclick={(e) => e.currentTarget.select()}
			tabindex="-1"
			autocomplete="off"
			spellcheck="false"
			autocapitalize="off"
			bind:value={code}
			class={clsx(
				'absolute inset-0',
				'bg-transparent text-transparent caret-white',
				'font-mono font-bold',
				'p-4',
				'resize-none overflow-hidden focus:outline-none'
			)}
		></textarea>
	</div>
{/snippet}

<div
	class={clsx(
		'grid grid-cols-1',
		'mx-auto w-full',
		'bg-slate-950/80 text-white',
		'rounded-xl',
		'border-2 border-slate-500/50'
	)}
>
	{@render heading()}
	{@render editors()}
</div>

<style>
	textarea,
	pre {
		overflow-wrap: break-word;
		white-space: pre-wrap;
		word-break: keep-all;
	}
</style>

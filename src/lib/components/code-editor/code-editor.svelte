<script lang="ts">
	import clsx from 'clsx';
	import { createOnigurumaEngine } from 'shiki';
	import {
		createHighlighterCore,
		type BundledLanguage,
		type BundledTheme,
		type HighlighterCore
	} from 'shiki/bundle/web';
	import { tick } from 'svelte';

	type Props = {
		code: string;
		title: string;
		theme: BundledTheme;
		lang: BundledLanguage;
	};

	let { code = $bindable(), title = $bindable(), theme, lang }: Props = $props();

	let highlighter: HighlighterCore | undefined = $state();
	let highlightedCode = $state();
	let loading = $state(true);
	let editorCode = $derived(code.length === 0 ? '// Type some code...' : code + '\t');
	let bgColor = $state('#fff');
	let textColor = $state('#000');

	async function initHighlighter() {
		loading = true;

		highlighter = await createHighlighterCore({
			langs: [
				import('shiki/langs/javascript.mjs'),
				import('shiki/langs/svelte.mjs'),
				import('shiki/langs/typescript.mjs'),
				import('shiki/langs/python.mjs')
			],
			themes: [
				import('shiki/themes/nord.mjs'),
				import('shiki/themes/dracula.mjs'),
				import('shiki/themes/material-theme.mjs'),
				import('shiki/themes/tokyo-night.mjs')
			],
			engine: createOnigurumaEngine(import('shiki/wasm'))
		});

		loading = false;
	}

	$effect(() => {
		initHighlighter();
		return () => highlighter!.dispose();
	});

	$effect(() => {
		if (theme || lang) {
			highlightedCode = highlighter?.codeToHtml(editorCode, {
				lang,
				theme,
				transformers: [
					{
						pre(node) {
							//const style = node.properties.style
							node.properties.class = 'p-4';
							getColor(node.properties.style as string);
						}
					}
				]
			});
		}
	});

	function getColor(style: string) {
		const [background, color] = style.split(';');
		bgColor = background.split(':')[1];
		textColor = color.split(':')[1];
	}

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
			<span class="size-3.5 rounded-full bg-red-500"></span>
			<span class="size-3.5 rounded-full bg-yellow-500"></span>
			<span class="size-3.5 rounded-full bg-green-500"></span>
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
			style="color: ${textColor}"
			class={clsx(
				'w-full justify-self-center bg-transparent text-center outline-none',
				'text-sm',
				'font-mono font-bold'
			)}
		/>
	</div>
{/snippet}

{#snippet editors()}
	<div class="relative">
		{@html highlightedCode}
		<textarea
			onkeydown={handleKeyDown}
			onclick={(e) => e.currentTarget.select()}
			tabindex="-1"
			autocomplete="off"
			spellcheck="false"
			autocapitalize="off"
			bind:value={code}
			class={clsx(
				'absolute inset-0 h-full',
				'bg-transparent text-transparent caret-white',
				'font-mono font-bold',
				'p-4',
				'resize-none overflow-hidden focus:outline-none'
			)}
		></textarea>
	</div>
{/snippet}

{#if !loading}
	<div
		style="background-color: {bgColor};"
		class={clsx(
			'grid grid-cols-1',
			'mx-auto w-full',
			'text-white',
			'overflow-hidden rounded-xl',
			'border-2 border-slate-500/50'
		)}
	>
		{@render heading()}
		{@render editors()}
	</div>
{/if}

<style>
	:global(textarea, pre) {
		overflow-wrap: break-word;
		white-space: pre-wrap;
		word-break: keep-all;
	}
</style>

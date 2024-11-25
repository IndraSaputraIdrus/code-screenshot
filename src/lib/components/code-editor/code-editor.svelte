<script lang="ts">
	import clsx from 'clsx';
	import { fade } from 'svelte/transition';
	import { createHighlighterCore, type HighlighterCore } from 'shiki/bundle/web';
	import { createOnigurumaEngine } from 'shiki/engine/oniguruma';
	import js from 'shiki/langs/javascript.mjs';
	import githubDark from 'shiki/themes/github-dark.mjs';

	let hl: HighlighterCore | undefined = $state();

	let editor = $state({
		title: 'Untitled-1',
		code: `console.log('Hello world')`,
		lang: 'javascript'
	});

	let codeRows = $derived((editor.code.match(/\n/g)?.length ?? 1) + 1);
	let highlighterCode = $derived(
		hl?.codeToHtml(editor.code, {
			lang: 'javascript',
			theme: 'github-dark',
			transformers: [
				{
					pre(node) {
						delete node.properties.style;
					}
				}
			]
		})
	);

	async function loadHighlighter() {
		const highlighter = await createHighlighterCore({
			themes: [githubDark],
			langs: [js],
			engine: createOnigurumaEngine(import('shiki/wasm'))
		});

		hl = highlighter;
	}

	$effect(() => {
		loadHighlighter();
		return () => hl?.dispose();
	});
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
			bind:value={editor.title}
			class={clsx(
				'w-full justify-self-center bg-transparent text-center outline-none',
				'text-sm opacity-60'
			)}
		/>
	</div>
{/snippet}

{#snippet codeBlock()}
	<div class="codeblock">
		<div class="p-4 font-mono">
			{@html highlighterCode}
		</div>
		<textarea
			style="caret-color: white;"
			tabindex="-1"
			autocomplete="off"
			spellcheck="false"
			autocapitalize="off"
			rows={codeRows}
			bind:value={editor.code}
			class="w-full resize-none bg-transparent p-4 font-mono text-white/0 outline-none"
		></textarea>
	</div>
{/snippet}

{#if highlighterCode}
	<div
		in:fade={{ duration: 200 }}
		class={clsx(
			'grid grid-cols-1',
			'mx-auto w-full max-w-2xl',
			'bg-slate-950 text-white',
			'rounded-lg',
			'border border-slate-500/50'
		)}
	>
		{@render heading()}
		{@render codeBlock()}
	</div>
{/if}

<style>
	.codeblock {
		display: grid;
		> * {
			width: 100%;
			grid-area: 1 / 1;
		}
	}
</style>

<script lang="ts">
	import CodeEditor from './code-editor';

	const maxWidth = 920;
	const minWidth = 520;

	let frame: HTMLElement;

	let frameWidth = $state(0);
	let width = $state(minWidth);
	let isResizing = $state(false);
	let startX = $state(0);
	let direction: 'left' | 'right' | undefined = $state();

	function handleMouseDown(e: MouseEvent, elementDirection: 'left' | 'right') {
		isResizing = true;
		startX = e.clientX;
		direction = elementDirection;
		frameWidth = frame.getBoundingClientRect().width;
	}

	function handleMouseUp() {
		isResizing = false;
		frameWidth = 0;
		direction = undefined;
		startX = 0;
	}

	function handleMouseMove(e: MouseEvent) {
		if (!isResizing) return;
		width = frame.getBoundingClientRect().width;
		const delta = e.clientX - startX;
		if (direction === 'left') {
			frame.style.width = `${frameWidth - delta * 2}px`;
		} else {
			frame.style.width = `${frameWidth + delta * 2}px`;
		}
	}
</script>

<svelte:window onmousemove={handleMouseMove} onmouseup={handleMouseUp} />

{#snippet resizeButton()}
	<button
		onmousedown={(e) => handleMouseDown(e, 'left')}
		aria-label="resize-button"
		class="absolute -left-2 top-1/2 grid size-4 -translate-y-1/2 cursor-col-resize place-content-center focus:outline-none"
	>
		<span class="block size-1.5 rounded-full bg-white"></span>
	</button>

	<button
		onmousedown={(e) => handleMouseDown(e, 'right')}
		aria-label="resize-button"
		class="absolute -right-2 top-1/2 grid size-4 -translate-y-1/2 cursor-col-resize place-content-center focus:outline-none"
	>
		<span class="block size-1.5 rounded-full bg-white"></span>
	</button>
{/snippet}

<div
	bind:this={frame}
	style="min-width: {minWidth}px; max-width: {maxWidth}px; width: auto"
	class="relative mx-auto w-full bg-gradient-to-br from-pink-700 to-fuchsia-700 p-5"
>
	{@render resizeButton()}
	<CodeEditor />
</div>

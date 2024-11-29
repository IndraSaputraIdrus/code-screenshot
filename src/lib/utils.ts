import { toPng } from 'html-to-image';

export async function download(element: HTMLElement | null, filename?: string) {
  if (element === null) return;

  const dataUrl = await toPng(element, {
    filter: (node) => node.tagName !== 'BUTTON'
  });

  const link = document.createElement('a');
  link.download = `${filename ?? 'output'}.png`
  link.href = dataUrl;
  link.click();
}

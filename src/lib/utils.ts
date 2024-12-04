import { toBlob, toPng } from 'html-to-image';

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

export async function preview(element: HTMLElement | null) {
  if (element === null) return

  try {

    const imageResult = await toBlob(element, {
      filter: (node) => node.tagName !== 'BUTTON'
    });

    if (!imageResult) throw new Error("Something error")

    const url = URL.createObjectURL(imageResult)
    window.open(url, "_blank")?.focus()
  } catch (e) {
    console.log(e)
  }
}

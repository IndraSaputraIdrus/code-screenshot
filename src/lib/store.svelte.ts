import type { BundledLanguage, BundledTheme } from "shiki/bundle/web";

export type Store = {
  frame: HTMLElement | null,
  code: string,
  title: string,
  language: BundledLanguage;
  theme: BundledTheme;
  background: string;
  padding: string
}


export const appStore: Store = $state({
  frame: null,
  code: `function sayHello() {\n\treturn 'Hello world'\n} \n\nconsole.log(sayHello())`,
  title: 'main.js',
  language: 'javascript',
  theme: 'dracula',
  background: 'hyper',
  padding: '1rem'
})


export type Store = {
  frame: HTMLElement | null,
  code: string,
  title: string,
  language: string;
  theme: string;
  background: string;
  padding: string;
}

export const appStore: Store = $state({
  frame: null,
  code: `function sayHello() {\n\treturn 'Hello world'\n} \n\nconsole.log(sayHello())`,
  title: 'main.js',
  language: 'javascript',
  theme: 'github-dark',
  background: 'hyper',
  padding: 'small'
})

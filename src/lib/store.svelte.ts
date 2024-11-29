
type Store = {
  frame: HTMLElement | null,
  code: string,
  title: string,
}

export const appStore: Store = $state({
  frame: null,
  code: `function sayHello() {\n\treturn 'Hello world'\n} \n\nconsole.log(sayHello())`,
  title: 'main.js'
})

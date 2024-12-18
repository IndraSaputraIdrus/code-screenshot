import type { Store } from "./store.svelte";
import type { BundledLanguage, BundledTheme } from "shiki/bundle/web";

type SelectItems = {
  name: keyof Omit<Store, 'frame'>;
  options: { name: string | number; value: string }[];
};

// source: https://colortopia.vercel.app/
export const themes: { name: string, value: BundledTheme }[] = [
  { name: "Nord", value: "nord" },
  { name: "Dracula", value: "dracula" },
  { name: "Material", value: "material-theme" },
  { name: "Tokyo Night", value: "tokyo-night" },
]

export const languages: { name: string, value: BundledLanguage }[] = [
  { name: "Javascript", value: "javascript" },
  { name: "Svelte", value: "svelte" },
  { name: "Typescript", value: "typescript" },
  { name: "Python", value: "python" },
]


export const paddings: { name: number, value: string }[] = [
  { name: 16, value: "1rem" },
  { name: 32, value: "2rem" },
  { name: 64, value: "4rem" },
  { name: 128, value: "8rem" },
]

export const backgrounds: { name: string, value: string }[] = [
  {
    name: "Hyper",
    value: "hyper"
  },
  {
    name: 'Oceanic',
    value: "oceanic"
  },
  {
    name: "Gotham",
    value: "gotham"
  }
]

export const selectItems: SelectItems[] = [
  {
    name: 'language',
    options: languages,
  },
  {
    name: 'background',
    options: backgrounds
  },
  {
    name: "theme",
    options: themes
  },
  {
    name: 'padding',
    options: paddings
  }
];

export const backgroundClass = [
  {
    name: "hyper",
    value: "bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500"
  },
  {
    name: 'oceanic',
    value: "bg-gradient-to-br from-green-300 via-blue-500 to-purple-600"
  },
  {
    name: "gotham",
    value: 'bg-gradient-to-br from-gray-700 via-gray-900 to-black'
  }
]

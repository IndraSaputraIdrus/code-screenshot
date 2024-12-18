import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        mono: ['Jetbrains Mono', 'monospace']
      }
    }
  },

  plugins: []
} satisfies Config;

import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'border-red-500',
    'border-blue-500',
    'border-green-500',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        sans: ['Roboto', 'Helvetica'],
      },
    },
  },
  plugins: [],
} satisfies Config;

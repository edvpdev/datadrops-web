import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './node_modules/flowbite-react/**/*.js',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/components/**/*.{js,ts,jsx,tsx,mdx}',
    './features/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './public/**/*.html'
  ],
  plugins: [require('daisyui'), require('flowbite/plugin')],
  theme: {
    extend: {
      backgroundSize: {
        'size-200': '200% 200%'
      },
      backgroundPosition: {
        'pos-0': '0% 0%',
        'pos-100': '100% 100%'
      },
      rotate: {
        30: '30deg',
        40: '40deg'
      }
    },
    colors: {
      'purple-glass': 'rgb(172 148 250 / 0.1)',
      'anti-glass': '#F2F2FF'
    }
  },
  daisyui: {
    themes: [
      {
        light: {
          primary: '#176B87',
          'primary-focus': '#125368',
          'primary-content': '#ffffff',

          secondary: '#86B6F6',
          'secondary-focus': '#6494d3',
          'secondary-content': '#ffffff',

          accent: '#b3d4ff',
          'accent-focus': '#87b8f7',
          'accent-content': '#ffffff',

          neutral: '#3b424e',
          'neutral-focus': '#2a2e37',
          'neutral-content': '#ffffff',

          'base-100': '#F1F1F1',
          'base-200': '#e0e0e0',
          'base-300': '#ced3d9',
          'base-content': '#1e2734',

          info: '#6b7280',
          success: '#0f766e',
          warning: '#c2410c',
          error: '#b91c1c',

          '--rounded-box': '1rem',
          '--rounded-btn': '.5rem',
          '--rounded-badge': '1.9rem',

          '--animation-btn': '.25s',
          '--animation-input': '.2s',

          '--btn-text-case': 'uppercase',
          '--navbar-padding': '.5rem',
          '--border-btn': '1px'
        }
      }
    ],
    darkTheme: 'dark', // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true // Shows info about daisyUI version and used config in the console when building your CSS
  }
};
export default config;

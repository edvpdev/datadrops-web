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
        mytheme: {
          primary: '#fa46a4',
          secondary: '#25d1ee',
          accent: '#bd8ac6',
          neutral: '#292a38',
          'base-100': '#e5e7eb',
          info: '#bae6fd',
          success: '#6ee7b7',
          warning: '#fef08a',
          error: '#ef4444'
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

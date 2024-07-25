/* eslint-disable @typescript-eslint/no-var-requires */
const { nextui } = require('@nextui-org/react')
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [
    nextui({
      defaultTheme: 'light',
      defaultExtendTheme: 'light',
      themes: {
        light: {
          colors: {
            foreground: '#fff',
            default: {
              foreground: '#fff'
            },
            primary: {
              foreground: '#fff',
              900: '#1B7C7D',
              DEFAULT: '#34D399'
              
            },
            secondary: {
              foreground: '#fff',
              900: '#B89049',
              DEFAULT: '#FCB546'
            }
          }, 
        },
        dark: {
          colors: {
            foreground: '#fff',
            default: {
              foreground: '#fff'
            },
            primary: {
              foreground: '#fff',
              DEFAULT: '#34D399'
            },
            secondary: {
              foreground: '#fff',
              DEFAULT: '#FCB546'
            }
          }, 
        }

      }
    }),
  ],
}

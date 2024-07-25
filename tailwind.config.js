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
          foreground: '#fff',
          default: {
            foreground: '#fff'
          },
          primary: {
            foreground: '#fff'
          },
          secondary: {
            foreground: '#fff'
          }
          
        }
      }
    }),
  ],
}

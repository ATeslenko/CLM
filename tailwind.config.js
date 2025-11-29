/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'graphik': ['Graphik LC Web', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        'brand-primary': '#248567',
        'brand-secondary': '#6453CF',
        'catchy-fire': '#FDDCBD',
        'secondary-light': '#767676',
        'secondary-dark': '#181818',
        'surface-primary': '#f7f4f2',
      },
      fontSize: {
        '9': ['9px', { lineHeight: 'normal' }],
        '13': ['13px', '16px'],
        '14': ['14px', '17px'],
        '24': ['24px', '29px'],
      },
      fontWeight: {
        'regular': 400,
        'semibold': 600,
        'bold': 700,
      },
      boxShadow: {
        'subtle': '0px 0px 1px 0px rgba(47,47,47,0.04), 0px 1px 4px 0px rgba(47,47,47,0.12)',
      }
    },
  },
  plugins: [],
}

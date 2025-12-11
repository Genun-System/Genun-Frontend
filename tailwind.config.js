/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

module.exports = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
      },
      fontFamily: {
        oxygen: ['var(--font-oxygen)'],
        crimsonText: ['var(--font-crimson-text)'],
        dmSans: ['var(--font-dm-sans)'],
        inter: ['var(--font-inter)'],
        oxygenMono: ['var(--font-oxygen-mono)']
      },
      colors: {
        background: "#FAFBFD",
        primary:"#235789",
        poosGray: "#47493580",
        error:"#FF647C"
      },
      screens: {
        tabletland:"992px",
        lg:"1200px"
      }
    },
  },
  plugins: [],
});

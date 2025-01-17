import daisyui from "daisyui";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Montserrat Subrayada", "sans-serif"],
        subheading: ["Lora", "sans-serif"],
        content: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [daisyui],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./css/*.css"],
  theme: {
    extend: {
      colors: {
        black: "var(--black)",
        bg: "var(--bg)",
        accent: "var(--accent)",
      },
      fontFamily: {
        display: "Sofia Sans Condensed",
        body: "Roboto Slab, sans-serif",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./css/*.css"],
  theme: {
    extend: {
      colors: {
        black: "var(--black)",
        bg: "var(--bg)",
        accent: "var(--accent)",
        accentRevert: "var(--accentRevert)",
      },
      fontFamily: {
        display: "Unbounded",
        body: "Roboto Flex, sans-serif",
        curve: "Caveat, sans-serif",
      },
    },
  },
  plugins: ["postcss-import"],
};

import { defineConfig } from "vite";

export default defineConfig({
  base: "/dolina/",
  build: {
    sourcemap: true,
    // Reduce bloat from legacy polyfills.
    target: "esnext",
    // Leave minification up to applications.
    minify: true,
  },
});

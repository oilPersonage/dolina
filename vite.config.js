import { defineConfig } from "vite";

export default defineConfig({
  base: "/dolina/",
  entry: "./main.js",
  build: {
    sourcemap: true,
    // Reduce bloat from legacy polyfills.
    target: "esnext",
    // Leave minification up to applications.
    minify: true,
  },
  server: {
    hmr: true,
    watch: {
      usePolling: true,
    },
  },
});

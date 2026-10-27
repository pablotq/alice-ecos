import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.NODE_ENV": JSON.stringify("production")
  },
  css: {
    preprocessorOptions: {
      scss: { api: "modern-compiler" }
    }
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    lib: {
      entry: "src/system.ts",
      formats: ["es"],
      fileName: () => "system.mjs"
    },
    rollupOptions: {
      output: {
        // single-file bundle, no code-splitting: Foundry loads this one ESM file directly
        inlineDynamicImports: true
      }
    }
  }
});

// Builds the whole site into ONE html file that opens by double-click (no server, no install).
// npm run build:share  ->  share/temu-redesign-demo.html
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: { outDir: "share", emptyOutDir: true },
});

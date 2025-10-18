import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// No proxy needed in container; for local dev you can add proxy to 5000
export default defineConfig({
  plugins: [react()]
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 4200,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:4200",
  },
});

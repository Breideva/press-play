import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        // All requests that start with '/api' will be proxied
        target: "https://api.rawg.io", // The target API server to forward requests to
        changeOrigin: true, // Changes the origin of the host header to the target URL
        rewrite: (path) => path.replace(/^\/api/, ""), // Removes '/api' from the request path
      },
    },
  },
});

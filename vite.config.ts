import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    proxy: {
      "/api": {
        target: "https://ksmatuy.icomm.vn",
        changeOrigin: true,
        secure: false,
        cookieDomainRewrite: "localhost",
        cookiePathRewrite: "/",
      },
    },
  },
});

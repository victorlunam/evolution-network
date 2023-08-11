import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/evolution-network/",
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@controllers": path.resolve(__dirname, "src/controllers"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@store": path.resolve(__dirname, "src/store"),
      "@models": path.resolve(__dirname, "src/models"),
    },
  },
});

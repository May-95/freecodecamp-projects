import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
export default defineConfig({
  base: "/freecodecamp-projects/FCC Front End Development Libraries Projects/Project 1 - Random Quote Machine/",
  server: {
    proxy: {
      "/api": {
        target: "https://zenquotes.io/api/random",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  plugins: [react()],
});
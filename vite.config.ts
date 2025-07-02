import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer()
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "public/assets"),
      "firebase/app": path.resolve(
        import.meta.dirname,
        "node_modules/firebase/app"
      ),
      "firebase/firestore": path.resolve(
        import.meta.dirname,
        "node_modules/firebase/firestore"
      ),
      // Add other Firebase submodules as needed (e.g., "firebase/auth")
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "@mui/material"],
          firebase: [
            "firebase/app",
            "firebase/firestore",
            // Add other Firebase submodules
          ],
          radix: ["@radix-ui/react-accordion", "@radix-ui/react-dialog"],
        },
      },
    },
  },
});

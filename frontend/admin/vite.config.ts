import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import path from "path";

export default defineConfig({
    plugins: [react()],
    css: {
        postcss: {
            plugins: [tailwindcss()],
        },
    },
    server: {
        watch: {
            usePolling: true,
        },
        host: true, // Here
        strictPort: true,
        port: 3000,
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
            "@ckeditor": path.resolve(__dirname, "node_modules/@ckeditor"),
            "@features": path.resolve(__dirname, "src/features"),
            "@components": path.resolve(__dirname, "src/components"),
            "@stores": path.resolve(__dirname, "src/stores"),
            "@constants": path.resolve(__dirname, "src/constants"),
            "@config": path.resolve(__dirname, "src/config"),
            "@utils": path.resolve(__dirname, "src/utils"),
            "@hooks": path.resolve(__dirname, "src/hooks"),
            "@assets": path.resolve(__dirname, "src/assets"),
            "@types": path.resolve(__dirname, "src/types"),
        },
    },
    optimizeDeps: {
        include: ["@ckeditor/ckeditor5-build-classic"],
    },
});

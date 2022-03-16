import {svelte} from "@sveltejs/vite-plugin-svelte";
import {VitePWA} from "vite-plugin-pwa";
import path from "path";

export default {
    server: {
        host: "0.0.0.0",
        port: 3000
    },
    resolve: {
        alias: {
            "@": path.resolve("./src")
        }
    },
    plugins: [
        svelte({
            experimental: {
                prebundleSvelteLibraries: true
            }
        }),
        VitePWA({
            includeAssets: ["favicon.svg"],
            registerType: "autoUpdate",
            manifest: {
                name: "Iota Tech Task",
                short_name: "Iota Tech Task",
                orientation: "portrait",
                display: "standalone",
                theme_color: "#ffffff",
                background_color: "#ffffff",
                icons: [
                    {
                        src: "./pwa/pwa-192x192.png",
                        sizes: "192x192",
                        type: "image/png"
                    },
                    {
                        src: "./pwa/pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png"
                    }
                ]
            }
        })
    ],
    optimizeDeps: {
        exclude: ["tinro"]
    }
};

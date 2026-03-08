import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import vitePrerender from "vite-plugin-prerender";

const prerenderRoutes = [
  "/",
  "/review/onlyfans-review",
  "/review/fansly-review",
  "/review/chaturbate-review",
  "/review/stripchat-review",
  "/review/bumble-review",
  "/review/fanvue-review",
  "/compare/onlyfans-vs-fansly",
  "/compare/chaturbate-vs-stripchat",
  "/compare/tinder-vs-bumble",
  "/compare/onlyfans-vs-patreon",
  "/best/onlyfans-alternatives",
  "/best/free-cam-sites",
  "/best/hookup-apps",
  "/best/ai-girlfriend-apps",
  "/best/chaturbate-alternatives",
  "/best/creator-platforms-beginners",
  "/category/creator-platforms",
  "/category/live-cam-sites",
  "/category/dating-apps",
  "/category/ai-companions",
  "/category/streaming-sites",
  "/category/sexting-apps",
  "/category/aggregators",
  "/advertise",
  "/write-for-us",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms",
];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode === "production" &&
      vitePrerender({
        routes: prerenderRoutes,
      }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

import { siteData } from "@/components/data/siteData";

export default function manifest() {
  return {
    name: siteData.title,
    short_name: siteData.name,
    description: siteData.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#2563eb",
    // Built by scripts/generate-icons.mjs from the same portrait as the favicon.
    icons: [
      { src: "/icon.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}

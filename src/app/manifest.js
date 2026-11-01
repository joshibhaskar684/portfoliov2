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
    icons: [
      { src: "/icon", sizes: "96x96", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}

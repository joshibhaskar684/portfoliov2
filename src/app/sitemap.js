import { absoluteUrl, siteData } from "@/components/data/siteData";

export default function sitemap() {
  const lastModified = new Date();

  return [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      images: [absoluteUrl(siteData.image)],
    },
    {
      url: absoluteUrl("/about"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/contact"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}

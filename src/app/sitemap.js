import { getAllBlogs } from "@/components/blogdata/blogs";
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
    {
      url: absoluteUrl("/blog"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...getAllBlogs().map((blog) => ({
      url: absoluteUrl(`/blog/${blog.id}`),
      lastModified: new Date(blog.updated ?? blog.date),
      changeFrequency: "monthly",
      priority: 0.6,
    })),
  ];
}

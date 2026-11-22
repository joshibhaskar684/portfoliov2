import { ImageResponse } from "next/og";
import { formatBlogDate, getAllBlogs, getBlogById } from "@/components/blogdata/blogs";
import { siteData } from "@/components/data/siteData";

// Share image for each post, so links on LinkedIn, X or WhatsApp show the
// post's title instead of the site-wide card.
export const alt = `Blog post by ${siteData.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllBlogs().map((blog) => ({ "blog-id": blog.id }));
}

export default async function Image({ params }) {
  const { "blog-id": blogId } = await params;
  const blog = getBlogById(blogId);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px 80px",
          background: "linear-gradient(135deg, #0a0a0a 0%, #0f172a 55%, #1e3a8a 100%)",
          color: "#ededed",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: "#93c5fd" }}>
          {siteData.name}
          <span style={{ color: "#60a5fa", margin: "0 14px" }}>·</span>
          Blog
        </div>

        <div style={{ display: "flex", fontSize: 62, lineHeight: 1.15, letterSpacing: -1, maxWidth: 1040 }}>
          {blog.title}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 12 }}>
            {blog.tags.slice(0, 4).map((tag) => (
              <div
                key={tag}
                style={{
                  padding: "8px 20px",
                  borderRadius: 999,
                  border: "2px solid rgba(59, 130, 246, 0.5)",
                  background: "rgba(59, 130, 246, 0.12)",
                  color: "#93c5fd",
                  fontSize: 24,
                }}
              >
                {tag}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 26, color: "#a3a3a3" }}>{formatBlogDate(blog.date)}</div>
        </div>
      </div>
    ),
    size
  );
}

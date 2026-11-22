import { BLOG_DESCRIPTION, BLOG_NAME, getAllBlogs } from "@/components/blogdata/blogs";
import { absoluteUrl, siteData } from "@/components/data/siteData";

// /blog/feed.xml: RSS 2.0 feed of every post, newest first, for feed readers
// and the crawlers that discover new articles through feeds.
export const dynamic = "force-static";

const escapeXml = (text) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const rssDate = (date) => new Date(date).toUTCString();

export function GET() {
  const blogs = getAllBlogs().sort((a, b) => b.date.localeCompare(a.date));
  const feedUrl = absoluteUrl("/blog/feed.xml");

  const items = blogs.map((blog) => {
    const url = absoluteUrl(`/blog/${blog.id}`);
    return `    <item>
      <title>${escapeXml(blog.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${rssDate(blog.date)}</pubDate>
      <dc:creator>${escapeXml(siteData.name)}</dc:creator>
      <description>${escapeXml(blog.description)}</description>
${blog.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`).join("\n")}
    </item>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(BLOG_NAME)}</title>
    <link>${absoluteUrl("/blog")}</link>
    <description>${escapeXml(BLOG_DESCRIPTION)}</description>
    <language>en</language>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
${blogs.length > 0 ? `    <lastBuildDate>${rssDate(blogs[0].updated ?? blogs[0].date)}</lastBuildDate>\n` : ""}${items.join("\n")}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}

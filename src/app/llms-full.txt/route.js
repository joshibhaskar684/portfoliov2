import { getAllBlogs } from "@/components/blogdata/blogs";
import { SITE_URL, absoluteUrl, siteData } from "@/components/data/siteData";

// /llms-full.txt: the complete Markdown of every blog post, so AI assistants
// can read, quote and cite an article without parsing the HTML page.
export const dynamic = "force-static";

// Root-relative links and images in posts become absolute, since this file
// is read outside the site.
const withAbsoluteLinks = (markdown) => markdown.replace(/\]\(\//g, `](${SITE_URL}/`);

export function GET() {
  const { name, jobTitle, company } = siteData;

  const lines = [
    `# ${name}: blog articles`,
    "",
    `> Full text of every article on ${absoluteUrl("/blog")}, written by ${name}, ${jobTitle} at ${company}. Author profile and site overview: ${absoluteUrl("/llms.txt")}`,
    "",
    ...getAllBlogs().flatMap((blog) => [
      "---",
      "",
      `# ${blog.title}`,
      "",
      `- URL: ${absoluteUrl(`/blog/${blog.id}`)}`,
      `- Author: ${name} (${absoluteUrl("/about")})`,
      `- Published: ${blog.date}`,
      ...(blog.updated ? [`- Updated: ${blog.updated}`] : []),
      `- Topics: ${[...new Set([...blog.tags, ...blog.about])].join(", ")}`,
      "",
      `> ${blog.description}`,
      "",
      withAbsoluteLinks(blog.content.trim()),
      "",
    ]),
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

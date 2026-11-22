import fs from "node:fs";
import path from "node:path";
import { siteData } from "@/components/data/siteData";

// Every `.md` file in this folder is a blog post, and its file name is the
// post's URL id: `my-first-post.md` is served at /blog/my-first-post.
// Files starting with `_` (like `_template.md`) and posts marked
// `draft: true` are skipped.
const BLOG_DIR = path.join(process.cwd(), "src/components/blogdata");

const WORDS_PER_MINUTE = 200;

// Used by the /blog page, its structured data and the RSS feed.
export const BLOG_NAME = `${siteData.name}'s Blog`;
export const BLOG_DESCRIPTION =
  "Write-ups by Bhaskar Joshi, a Software Engineer at Quana, on backend engineering, cloud, DevOps, security incidents and system design.";

// A `## FAQ` or `## Frequently asked questions` section whose `###` headings
// are questions becomes FAQPage structured data for the post.
const FAQ_HEADING = /^## (?:FAQ|Frequently asked questions)\s*$/im;

const unquote = (value) => value.trim().replace(/^(["'])(.*)\1$/, "$2");

// Plain text of inline Markdown: link text is kept, code and bold marks dropped.
const stripMarkdown = (text) =>
  text
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/`|\*\*?/g, "")
    .replace(/\s+/g, " ")
    .trim();

// Heading ids. The post page builds the same id from the rendered heading.
export const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

// Reads the `key: value` block between the leading `---` lines. Values
// written as `[a, b, c]` become arrays.
function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { data: {}, content: raw };

  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;

    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();
    data[key] =
      value.startsWith("[") && value.endsWith("]")
        ? value.slice(1, -1).split(",").map(unquote).filter(Boolean)
        : unquote(value);
  }

  return { data, content: raw.slice(match[0].length) };
}

// `##` headings, for the post's table of contents.
function extractHeadings(prose) {
  return [...prose.matchAll(/^## (.+)$/gm)].map(([, heading]) => {
    const text = stripMarkdown(heading);
    return { text, id: slugify(text) };
  });
}

function extractFaqs(prose) {
  const start = prose.search(FAQ_HEADING);
  if (start === -1) return [];

  const section = prose.slice(start).split(/\n## /)[0];
  return section
    .split(/^### /m)
    .slice(1)
    .map((block) => {
      const [question, ...answer] = block.split("\n");
      return { question: stripMarkdown(question), answer: stripMarkdown(answer.join(" ")) };
    })
    .filter(({ answer }) => answer);
}

function readBlog(id) {
  const raw = fs.readFileSync(path.join(BLOG_DIR, `${id}.md`), "utf8");
  const { data, content } = parseFrontmatter(raw);
  // Code blocks can hold `#` comments that look like headings.
  const prose = content.replace(/^```[\s\S]*?^```/gm, "");
  const wordCount = content.split(/\s+/).filter(Boolean).length;

  return {
    id,
    title: data.title ?? id,
    description: data.description ?? "",
    date: data.date ?? "",
    updated: data.updated || null,
    tags: data.tags ?? [],
    keywords: data.keywords ?? [],
    about: data.about ?? [],
    featured: data.featured === "true",
    cover: data.cover || null,
    draft: data.draft === "true",
    wordCount,
    readingTime: Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE)),
    headings: extractHeadings(prose),
    faqs: extractFaqs(prose),
    content,
  };
}

// Published posts: featured ones first, then newest first.
export function getAllBlogs() {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md") && !file.startsWith("_"))
    .map((file) => readBlog(file.slice(0, -".md".length)))
    .filter((blog) => !blog.draft)
    .sort((a, b) => Number(b.featured) - Number(a.featured) || b.date.localeCompare(a.date));
}

export function getBlogById(id) {
  return getAllBlogs().find((blog) => blog.id === id) ?? null;
}

export function formatBlogDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

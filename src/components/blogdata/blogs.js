import fs from "node:fs";
import path from "node:path";

// Every `.md` file in this folder is a blog post, and its file name is the
// post's URL id: `my-first-post.md` is served at /blog/my-first-post.
// Files starting with `_` (like `_template.md`) and posts marked
// `draft: true` are skipped.
const BLOG_DIR = path.join(process.cwd(), "src/components/blogdata");

const WORDS_PER_MINUTE = 200;

const unquote = (value) => value.trim().replace(/^(["'])(.*)\1$/, "$2");

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

function readBlog(id) {
  const raw = fs.readFileSync(path.join(BLOG_DIR, `${id}.md`), "utf8");
  const { data, content } = parseFrontmatter(raw);
  const words = content.split(/\s+/).filter(Boolean).length;

  return {
    id,
    title: data.title ?? id,
    description: data.description ?? "",
    date: data.date ?? "",
    updated: data.updated || null,
    tags: data.tags ?? [],
    cover: data.cover || null,
    draft: data.draft === "true",
    readingTime: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
    content,
  };
}

// Published posts, newest first.
export function getAllBlogs() {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md") && !file.startsWith("_"))
    .map((file) => readBlog(file.slice(0, -".md".length)))
    .filter((blog) => !blog.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
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

import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { BLOG_NAME, formatBlogDate, getAllBlogs, getBlogById, slugify } from "@/components/blogdata/blogs";
import AuthorCard from "@/components/Cards/AuthorCard/AuthorCard";
import BlogCard from "@/components/Cards/BlogCard/BlogCard";
import JsonLd from "@/components/seo/JsonLd";
import { articleMetadata } from "@/components/seo/metadata";
import { blogPostingSchema, breadcrumbSchema, faqPageSchema, jsonLdGraph } from "@/components/seo/schema";

// Every post is prerendered at build time; any other id is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllBlogs().map((blog) => ({ "blog-id": blog.id }));
}

export async function generateMetadata({ params }) {
  const { "blog-id": blogId } = await params;
  const blog = getBlogById(blogId);
  if (!blog) return {};

  return articleMetadata({
    title: blog.title,
    description: blog.description,
    path: `/blog/${blog.id}`,
    publishedTime: blog.date,
    modifiedTime: blog.updated,
    tags: blog.tags,
    keywords: blog.keywords,
  });
}

const textOf = (node) => {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  return node?.props?.children ? textOf(node.props.children) : "";
};

// Headings get ids so the table of contents, search results and shared links
// can jump straight to a section. scroll-mt keeps them below the sticky navbar.
const headingWithId = (Tag) =>
  function Heading({ children }) {
    return (
      <Tag id={slugify(textOf(children))} className="scroll-mt-24">
        {children}
      </Tag>
    );
  };

// External links in a post open in a new tab. Wide tables scroll on their
// own instead of making the whole page scroll sideways on phones.
const markdownComponents = {
  h2: headingWithId("h2"),
  h3: headingWithId("h3"),
  table: ({ children }) => (
    <div className="overflow-x-auto">
      <table>{children}</table>
    </div>
  ),
  a: ({ href = "", children }) =>
    href.startsWith("http") ? (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ) : (
      <Link href={href}>{children}</Link>
    ),
};

export default async function page({ params }) {
  const { "blog-id": blogId } = await params;
  const blog = getBlogById(blogId);
  if (!blog) notFound();

  const path = `/blog/${blog.id}`;
  const moreBlogs = getAllBlogs()
    .filter((other) => other.id !== blog.id)
    .slice(0, 2);

  return (
    <section className="min-h-screen bg-background text-foreground py-20">
      <JsonLd
        data={jsonLdGraph(
          blogPostingSchema(blog, BLOG_NAME),
          breadcrumbSchema(path, blog.title, { path: "/blog", name: "Blog" }),
          ...(blog.faqs.length > 0 ? [faqPageSchema({ faqs: blog.faqs, path })] : [])
        )}
      />
      <article className="max-w-3xl mx-auto px-6 lg:px-8">
        <Link href="/blog" className="text-sm font-semibold text-foreground/70 hover:text-blue-600 transition-colors">
          <span aria-hidden="true">←</span> All posts
        </Link>

        {/* Header */}
        <header className="mt-8 mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight leading-tight">{blog.title}</h1>
          <p className="text-foreground/60">
            <time dateTime={blog.date}>{formatBlogDate(blog.date)}</time>
            <span className="mx-2">•</span>
            {blog.readingTime} min read
            {blog.updated && (
              <>
                <span className="mx-2">•</span>
                Updated <time dateTime={blog.updated}>{formatBlogDate(blog.updated)}</time>
              </>
            )}
          </p>
          {blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {blog.tags.map((tag) => (
                <span key={tag} className="text-blue-600 bg-blue-600/10 px-3 py-1 rounded-full text-sm font-semibold">
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="h-1 w-20 bg-blue-600 mt-8 rounded-full"></div>
        </header>

        {blog.cover && (
          <img
            src={blog.cover}
            alt={blog.title}
            className="w-full aspect-video object-cover rounded-2xl border border-foreground/10 mb-12"
          />
        )}

        {blog.headings.length >= 3 && (
          <nav aria-label="On this page" className="bg-foreground/5 border border-foreground/10 rounded-2xl p-6 mb-12">
            <h2 className="text-lg font-bold mb-4">On this page</h2>
            <ol className="list-decimal ml-5 space-y-2 text-foreground/80">
              {blog.headings.map((heading) => (
                <li key={heading.id}>
                  <a href={`#${heading.id}`} className="hover:text-blue-600 transition-colors">
                    {heading.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-blue-600 prose-pre:rounded-xl prose-blockquote:not-italic prose-blockquote:font-normal prose-blockquote:border-blue-600 prose-blockquote:bg-blue-600/5 prose-blockquote:rounded-r-xl prose-blockquote:py-1 [&_blockquote_p]:before:content-none [&_blockquote_p]:after:content-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {blog.content}
          </ReactMarkdown>
        </div>

        <AuthorCard />

        {moreBlogs.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6">More from the blog</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {moreBlogs.map((other) => (
                <BlogCard key={other.id} {...other} headingAs="h3" />
              ))}
            </div>
          </section>
        )}

        <div className="mt-16 pt-8 border-t border-foreground/10">
          <Link href="/blog" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
            <span aria-hidden="true">←</span> Back to all posts
          </Link>
        </div>
      </article>
    </section>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { formatBlogDate, getAllBlogs, getBlogById } from "@/components/blogdata/blogs";
import JsonLd from "@/components/seo/JsonLd";
import { articleMetadata } from "@/components/seo/metadata";
import { blogPostingSchema, breadcrumbSchema, jsonLdGraph } from "@/components/seo/schema";

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
    image: blog.cover,
  });
}

// External links in a post open in a new tab.
const markdownComponents = {
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

  return (
    <section className="min-h-screen bg-background text-foreground py-20">
      <JsonLd
        data={jsonLdGraph(
          blogPostingSchema({
            path,
            title: blog.title,
            description: blog.description,
            datePublished: blog.date,
            dateModified: blog.updated,
            tags: blog.tags,
            image: blog.cover,
          }),
          breadcrumbSchema(path, blog.title, { path: "/blog", name: "Blog" })
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

        <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-blue-600 prose-pre:rounded-xl">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {blog.content}
          </ReactMarkdown>
        </div>

        <div className="mt-16 pt-8 border-t border-foreground/10">
          <Link href="/blog" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
            <span aria-hidden="true">←</span> Back to all posts
          </Link>
        </div>
      </article>
    </section>
  );
}

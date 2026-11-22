import Link from "next/link";
import { getAllBlogs } from "@/components/blogdata/blogs";
import BlogCard from "@/components/Cards/BlogCard/BlogCard";

// Featured posts come first, so a pinned post always shows here.
export default function Blog() {
  const blogs = getAllBlogs().slice(0, 3);
  if (blogs.length === 0) return null;

  return (
    <section id="blog" className="bg-background text-foreground py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-7xl">

        {/* Section Header */}
        <div className="mb-12 md:mb-16 text-center md:text-left flex flex-col md:items-start items-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight">
            Latest from the <span className="text-blue-600">Blog</span>
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-foreground/70 max-w-2xl leading-relaxed">
            Write-ups on backend engineering, cloud, DevOps and the production problems I&apos;ve had to solve.
          </p>
          <div className="h-1 w-24 bg-blue-600 mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} {...blog} headingAs="h3" />
          ))}
        </div>

        <div className="mt-10 text-center md:text-left">
          <Link href="/blog" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
            View all posts <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

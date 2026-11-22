import { getAllBlogs } from "@/components/blogdata/blogs";
import BlogCard from "@/components/Cards/BlogCard/BlogCard";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata } from "@/components/seo/metadata";
import { breadcrumbSchema, jsonLdGraph, webPageSchema } from "@/components/seo/schema";

const title = "Blog";
const description =
  "Articles by Bhaskar Joshi, a Software Engineer at Quana, on backend engineering, cloud, system design and full-stack development.";

export const metadata = pageMetadata({ title, description, path: "/blog" });

export default function page() {
  const blogs = getAllBlogs();

  return (
    <section className="min-h-screen bg-background text-foreground py-20">
      <JsonLd
        data={jsonLdGraph(
          webPageSchema({ type: "CollectionPage", path: "/blog", name: `${title} | Bhaskar Joshi`, description }),
          breadcrumbSchema("/blog", title)
        )}
      />
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="mb-16 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight">
            My <span className="text-blue-600">Blog</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 max-w-3xl">
            Notes on backend engineering, cloud, system design and the things I learn while building software.
          </p>
          <div className="h-1 w-20 bg-blue-600 mt-6 rounded-full mx-auto lg:mx-0"></div>
        </div>

        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} {...blog} />
            ))}
          </div>
        ) : (
          <p className="text-foreground/70 text-lg text-center lg:text-left">No posts yet. Check back soon.</p>
        )}
      </div>
    </section>
  );
}

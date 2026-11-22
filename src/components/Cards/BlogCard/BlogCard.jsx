import Link from "next/link";
import { formatBlogDate } from "@/components/blogdata/blogs";

// `headingAs` keeps the page outline right: h2 on /blog, h3 inside another section.
export default function BlogCard({ id, title, description, date, readingTime, tags, cover, featured, headingAs: Heading = "h2" }) {
  return (
    <Link
      href={`/blog/${id}`}
      className="group flex flex-col h-full bg-background text-foreground border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
    >
      {cover && (
        <div className="relative w-full aspect-video overflow-hidden border-b border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900">
          <img
            src={cover}
            alt={title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      <div className="flex flex-col flex-grow p-6 md:p-8">
        <p className="text-sm text-foreground/60 mb-3">
          {featured && (
            <>
              <span className="font-semibold text-blue-600">Featured</span>
              <span className="mx-2">•</span>
            </>
          )}
          <time dateTime={date}>{formatBlogDate(date)}</time>
          <span className="mx-2">•</span>
          {readingTime} min read
        </p>

        <Heading className="text-xl md:text-2xl font-bold line-clamp-3 mb-3 leading-tight group-hover:text-blue-600 transition-colors duration-300">
          {title}
        </Heading>

        <p className="text-foreground/70 text-sm md:text-base line-clamp-3 mb-6 flex-grow leading-relaxed">
          {description}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-3 mt-auto pt-6 border-t border-gray-100 dark:border-gray-800/50">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="text-blue-600 bg-blue-600/10 px-3 py-1 rounded-full text-xs font-semibold">
                {tag}
              </span>
            ))}
          </div>
          <span className="text-sm font-semibold text-blue-600">
            Read more <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}

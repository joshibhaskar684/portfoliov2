"use client";

export default function ProjectCard({ image, title, description, href, viewmore }) {
  return (
    <div className="group flex flex-col h-full bg-background text-foreground border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      
      {/* Project Image Wrapper (aspect-video maintains perfect 16:9 ratio) */}
      <div className="relative w-full aspect-video overflow-hidden border-b border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900">
        <img
          src={image}
          alt={title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Subtle blue tint on hover */}
        <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors duration-300"></div>
      </div>

      {/* Content Container (flex-grow pushes buttons to bottom) */}
      <div className="flex flex-col flex-grow p-6 md:p-8">
        
        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold line-clamp-2 mb-3 leading-tight group-hover:text-blue-600 transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-foreground/70 text-sm md:text-base line-clamp-4 mb-6 flex-grow leading-relaxed">
          {description}
        </p>

        {/* Buttons Action Area */}
        <div className="flex flex-col sm:flex-row gap-4 mt-auto pt-6 border-t border-gray-100 dark:border-gray-800/50">
          
          <a
            href={viewmore}
            className="flex-1 text-center px-4 py-2.5 rounded-lg border-2 border-blue-600 text-blue-600 font-semibold text-sm md:text-base hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors duration-200"
          >
            Details
          </a>
          
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center px-4 py-2.5 rounded-lg bg-blue-600 text-white font-semibold text-sm md:text-base hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-blue-600/20"
          >
            Live Link
          </a>
          
        </div>
      </div>
    </div>
  );
}
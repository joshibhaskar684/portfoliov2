"use client";

export default function ExperienceCard({
  company,
  role,
  duration,
  description,
}) {
  return (
    <div className="group flex flex-col h-full bg-background text-foreground border border-gray-200 dark:border-gray-800 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl md:text-2xl font-bold group-hover:text-blue-600 transition-colors duration-300">
            {role}
          </h3>
          <p className="text-blue-600 font-medium mt-1">
            {company}
          </p>
        </div>

        <div className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 text-xs md:text-sm font-medium whitespace-nowrap">
          {duration}
        </div>
      </div>

      {/* Description */}
      <p className="text-foreground/70 leading-relaxed flex-grow">
        {description}
      </p>

      {/* Bottom Accent */}
      <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
        <div className="h-1 w-16 rounded-full bg-blue-600"></div>
      </div>
    </div>
  );
}
"use client";

import ExperienceCard from "@/components/Cards/ExperienceCard/ExperienceCard";
import { experienceData } from "@/components/data/experienceData";


export default function Experience() {
  return (
    <section
      id="experience"
      className="bg-background text-foreground py-16 md:py-24 lg:py-32"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-7xl">

        {/* Section Header */}
        <div className="mb-12 md:mb-16 text-center md:text-left flex flex-col md:items-start items-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight">
            Work <span className="text-blue-600">Experience</span>
          </h2>

          <p className="text-base md:text-lg lg:text-xl text-foreground/70 max-w-2xl leading-relaxed">
            From frontend, backend, and DevOps internships to my current role as a
            Software Engineer at Quana, building scalable applications, migrating
            production systems to AWS, and improving system performance.
          </p>

          <div className="h-1 w-24 bg-blue-600 mt-6 rounded-full"></div>
        </div>

        {/* Experience Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {experienceData.map((exp, index) => (
            <ExperienceCard
              key={index}
              company={exp.company}
              role={exp.role}
              duration={exp.duration}
              description={exp.description}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
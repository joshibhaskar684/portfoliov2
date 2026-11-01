import ProjectCard from "@/components/Cards/ProjectsCards/ProjectsCard";
import { projectsdata } from "@/components/data/projectsdat";

export default function Projects() {
  const projects =projectsdata;

  return (
    <section id="projects" className="bg-background text-foreground py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-7xl">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-16 text-center md:text-left flex flex-col md:items-start items-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight">
            Featured <span className="text-blue-600">Projects</span>
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-foreground/70 max-w-2xl leading-relaxed">
            Here are some of the projects I have worked on, showcasing my expertise in building scalable, cloud-native applications.
          </p>
          <div className="h-1 w-24 bg-blue-600 mt-6 rounded-full"></div>
        </div>

        {/* Projects Grid (items-stretch ensures equal height cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {projects.map((item, index) => (
            <ProjectCard
              key={index}
              image={item.image}
              title={item.title}
              description={item.description}
              href={item.href}
              viewmore={item.viewmore}
            />
          ))}
        </div>
        
      </div>
    </section>
  );
}
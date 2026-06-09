export default function HeroSection() {
  const techStack = [
    "Microservices",
    "AWS",
    "Kubernetes",
    "Kafka",
    "Spring Boot",
    "Next.js",
    "Docker",
    "Nginx",
    "Redis",
    "Elasticsearch",
    "CI/CD",
    "Terraform",
  ];

  return (
    <section className="relative flex items-center justify-center min-h-[80vh] w-full bg-background text-foreground py-20 overflow-hidden">
      
      {/* Subtle Background Glow Effect */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 dark:bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 max-w-5xl relative z-10 flex flex-col items-start text-left">
        
        {/* Name & Greeting */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 tracking-tight">
          Hello, I'm <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700 drop-shadow-sm">
            Bhaskar Joshi
          </span>
        </h1>

        {/* Role / Title */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-foreground/90">
          Software Engineer | Scalable Backend & Cloud Systems
        </h2>

        {/* Description */}
        <p className="text-lg md:text-xl lg:text-2xl mb-8 text-foreground/70 max-w-3xl leading-relaxed">
          I design and build scalable microservices using Java, Spring Boot, React, and AWS, focusing on performance, reliability, and cloud-native architecture.
        </p>

        {/* Tech Tags (Pills) */}
        <div className="flex flex-wrap gap-3 mb-10">
          {techStack.map((tech, index) => (
            <span
              key={index}
              className="px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold text-sm md:text-base transition-colors hover:bg-blue-500 hover:text-white"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
          <button className="px-8 py-4 rounded-xl border-2 border-foreground font-semibold text-lg hover:bg-foreground hover:text-background transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1 w-full sm:w-auto">
            Download Resume
          </button>

          <button className="px-8 py-4 rounded-xl bg-blue-600 font-semibold text-lg text-white hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-blue-600/30 hover:-translate-y-1 w-full sm:w-auto">
            Contact Me
          </button>
        </div>

      </div>
    </section>
  );
}
import { experienceData } from "@/components/data/experienceData";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata } from "@/components/seo/metadata";
import { breadcrumbSchema, jsonLdGraph, webPageSchema } from "@/components/seo/schema";

const title = "About – Experience, Education & Skills";
const description =
  "Bhaskar Joshi from Haldwani, Uttarakhand: Software Engineer at Quana, ex-Full Stack intern at White Water Solutions, B.Tech CSE at Surajmal University.";

export const metadata = pageMetadata({ title, description, path: "/about" });

export default function page() {
  return (
    <section className="min-h-screen bg-background text-foreground py-20">
      <JsonLd
        data={jsonLdGraph(
          webPageSchema({ type: "AboutPage", path: "/about", name: `${title} | Bhaskar Joshi`, description }),
          breadcrumbSchema("/about", "About")
        )}
      />
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-16 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight">
            About <span className="text-blue-600">Me</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 max-w-3xl">
            Software Engineer at Quana | Full Stack Developer | Backend & Cloud Developer | Computer Science Engineer
          </p>
          <div className="h-1 w-20 bg-blue-600 mt-6 rounded-full mx-auto lg:mx-0"></div>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* LEFT COLUMN: Main Content (Spans 2 columns) */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Summary */}
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-blue-600">01.</span> Professional Summary
              </h2>
              <p className="text-foreground/80 leading-relaxed text-lg">
                I&apos;m Bhaskar Joshi, a Software Engineer at Quana and a Computer Science Engineering student (B.Tech, 2023–2027) based in
                Haldwani, Uttarakhand, India. At Quana, I migrated the production database, with all existing customer data, from Supabase
                to AWS RDS and moved the application from a Hostinger VPS to AWS EC2. Before that, I completed a Full Stack Developer
                internship at White Water Solutions and frontend, backend, and DevOps internships at VhBuyio.
              </p>
              <p className="text-foreground/80 leading-relaxed text-lg mt-4">
                Skilled in full-stack and backend development using React.js, Next.js, Java, Spring Boot, NestJS, Kafka, Redis, MinIO,
                SQL/NoSQL databases, and microservices architecture, with strong foundations in Data Structures & Algorithms, Operating
                Systems, and Computer Networks. Experienced in building scalable cloud-native applications using Docker, AWS, and CI/CD
                pipelines. Passionate about distributed systems, system design, and Agentic AI.
              </p>
            </section>



            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="text-blue-600">02.</span> Experience
              </h2>
              <div className="space-y-8 border-l-2 border-blue-600/30 ml-3 pl-6 relative">
                {experienceData.map((exp) => (
                  <div key={`${exp.company}-${exp.role}`} className="relative">
                    <div className="absolute -left-[35px] top-1.5 w-4 h-4 bg-background border-4 border-blue-600 rounded-full"></div>
                    <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                    <div className="text-blue-600 font-medium mb-2">{exp.company} <span className="text-foreground/50 mx-2">•</span> {exp.duration}</div>
                    <ul className="list-disc ml-5 space-y-1 text-foreground/80">
                      {exp.highlights.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="text-blue-600">03.</span> Education
              </h2>
              <div className="bg-foreground/5 border border-foreground/10 rounded-2xl p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                  <h3 className="text-xl font-bold">B.Tech in Computer Science Engineering</h3>
                  <span className="text-blue-600 font-semibold bg-blue-600/10 px-3 py-1 rounded-full text-sm mt-2 sm:mt-0">
                    2023 – 2027
                  </span>
                </div>
                <p className="text-lg text-foreground/80 mb-2">Surajmal University, Kichha</p>
                <p className="text-foreground font-medium flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                  SCGPA: 8.37 / 10
                </p>
              </div>
            </section>

          </div>

          {/* RIGHT COLUMN: Sidebar */}
          <div className="space-y-8">
            
            {/* Contact Card */}
            <div className="bg-foreground/5 border border-foreground/10 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-4 border-b border-foreground/10 pb-2">Contact Info</h3>
              <div className="space-y-4 text-foreground/80">
                <p className="flex items-start gap-3">
                  <span className="text-xl">📍</span> 
                  <span>Haldwani, Uttarakhand, India</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-xl">📞</span> 
                  <a href="tel:+916395653472" className="hover:text-blue-600 transition-colors">+91 6395653472</a>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-xl">✉️</span> 
                  <a href="mailto:joshibhaskar684@gmail.com" className="hover:text-blue-600 transition-colors truncate">joshibhaskar684@gmail.com</a>
                </p>
                
                <div className="pt-4 mt-4 border-t border-foreground/10 flex flex-col gap-3">
                  <a href="https://bhaskarjoshiportfolio.vercel.app" target="_blank" rel="noreferrer" className="flex items-center gap-2 font-medium hover:text-blue-600 transition-colors">
                    <span>🌐</span> Portfolio Website
                  </a>
                  <a href="https://linkedin.com/in/bhaskar-joshi-ji/" target="_blank" rel="noreferrer" className="flex items-center gap-2 font-medium hover:text-blue-600 transition-colors">
                    <span>💼</span> LinkedIn Profile
                  </a>
                  <a href="https://github.com/joshibhaskar684" target="_blank" rel="noreferrer" className="flex items-center gap-2 font-medium hover:text-blue-600 transition-colors">
                    <span>💻</span> GitHub (joshibhaskar684)
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Skills Summary (Complementary to the main Skills page) */}
            <div className="bg-foreground/5 border border-foreground/10 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-4 border-b border-foreground/10 pb-2">Tech Focus</h3>
              <div className="space-y-3 text-sm text-foreground/80">
                <p><strong className="text-foreground">Frontend:</strong> React, Next.js, Tailwind</p>
                <p><strong className="text-foreground">Backend:</strong> Java, Spring Boot, NestJS, Microservices</p>
                <p><strong className="text-foreground">Cloud:</strong> AWS (EC2, RDS), Docker, CI/CD</p>
                <p><strong className="text-foreground">Data:</strong> SQL, MongoDB, Redis, Kafka, MinIO</p>
              </div>
            </div>

            {/* Soft Skills */}
            <div className="bg-foreground/5 border border-foreground/10 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-4 border-b border-foreground/10 pb-2">Soft Skills</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Communication",
                  "Teamwork",
                  "Problem Solving",
                  "Time Management",
                  "Analytical Thinking",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-background border border-foreground/10 text-foreground/80 rounded-full text-sm font-medium hover:border-blue-500 hover:text-blue-600 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
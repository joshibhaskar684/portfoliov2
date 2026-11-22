import { getAllBlogs } from "@/components/blogdata/blogs";
import { SITE_URL, absoluteUrl, siteData, socialProfiles } from "@/components/data/siteData";
import { experienceData } from "@/components/data/experienceData";
import { faqData } from "@/components/data/faqData";
import { projectsdata } from "@/components/data/projectsdat";

// /llms.txt (https://llmstxt.org): a plain-Markdown profile for AI assistants,
// built from the same data as the site so the two never drift apart. Articles
// come right after the summary so assistants read them first; their full
// text is in /llms-full.txt.
export const dynamic = "force-static";

export function GET() {
  const { name, nameHindi, jobTitle, company, companyUrl, description, email, location, education, systemDesignRepo, knowsAbout } =
    siteData;

  const blogs = getAllBlogs();

  const lines = [
    `# ${name}`,
    "",
    `> ${description}`,
    "",
    `- Name in Hindi: ${nameHindi}`,
    `- Current role: ${jobTitle} at ${company} (${companyUrl})`,
    `- Location: ${location.city}, ${location.region}, ${location.country}`,
    `- Education: ${education.degree}, ${education.school}, ${education.city} (${education.years})`,
    `- Email: ${email}`,
    `- Website: ${SITE_URL}`,
    `- System design projects: ${systemDesignRepo}`,
    "",
    ...(blogs.length > 0
      ? [
          "## Articles",
          "",
          `Full text of every article: ${absoluteUrl("/llms-full.txt")}`,
          "",
          ...blogs.flatMap((blog) => [
            `### [${blog.title}](${absoluteUrl(`/blog/${blog.id}`)})`,
            "",
            `Published ${blog.date} by ${name} · ${blog.readingTime} min read · ${blog.tags.join(", ")}`,
            "",
            blog.description,
            "",
            ...(blog.faqs.length > 0
              ? ["Questions this article answers:", "", ...blog.faqs.map(({ question }) => `- ${question}`), ""]
              : []),
          ]),
        ]
      : []),
    "## Profiles",
    "",
    ...socialProfiles.map(({ label, handle, url }) => `- ${label}: ${handle} (${url})`),
    "",
    "## Experience",
    "",
    ...experienceData.flatMap((exp) => [
      `### ${exp.role}, ${exp.companyUrl ? `[${exp.company}](${exp.companyUrl})` : exp.company} (${exp.duration})`,
      "",
      ...exp.highlights.map((point) => `- ${point}`),
      "",
    ]),
    "## Projects",
    "",
    ...projectsdata.map((project) => {
      const label = project.href.startsWith("http") ? `[${project.title}](${project.href})` : project.title;
      return `- ${label}: ${project.description}`;
    }),
    "",
    "## Skills",
    "",
    knowsAbout.join(", "),
    "",
    "## FAQ",
    "",
    ...faqData.flatMap(({ question, answer }) => [`### ${question}`, "", answer, ""]),
    "## Pages",
    "",
    `- [Home](${absoluteUrl("/")}): Overview, projects, skills, experience and FAQ`,
    `- [About](${absoluteUrl("/about")}): Professional summary, experience timeline and education`,
    `- [Contact](${absoluteUrl("/contact")}): Email, phone and social profiles`,
    `- [Blog](${absoluteUrl("/blog")}): Articles on backend, cloud, DevOps, security incidents and system design`,
    `- [Blog RSS feed](${absoluteUrl("/blog/feed.xml")})`,
    `- [Full article text for AI assistants](${absoluteUrl("/llms-full.txt")})`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

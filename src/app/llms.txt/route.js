import { SITE_URL, absoluteUrl, siteData } from "@/components/data/siteData";
import { experienceData } from "@/components/data/experienceData";
import { faqData } from "@/components/data/faqData";
import { projectsdata } from "@/components/data/projectsdat";

// /llms.txt (https://llmstxt.org): a plain-Markdown profile for AI assistants,
// built from the same data as the site so the two never drift apart.
export const dynamic = "force-static";

export function GET() {
  const { name, nameHindi, githubUsername, jobTitle, company, description, email, location, education, social, systemDesignRepo, knowsAbout } =
    siteData;

  const lines = [
    `# ${name}`,
    "",
    `> ${description}`,
    "",
    `- Name in Hindi: ${nameHindi}`,
    `- Current role: ${jobTitle} at ${company}`,
    `- Location: ${location.city}, ${location.region}, ${location.country}`,
    `- Education: ${education.degree}, ${education.school}, ${education.city} (${education.years})`,
    `- Email: ${email}`,
    `- LinkedIn: ${social.linkedin}`,
    `- GitHub: ${githubUsername} (${social.github})`,
    `- System design projects: ${systemDesignRepo}`,
    `- Website: ${SITE_URL}`,
    "",
    "## Experience",
    "",
    ...experienceData.flatMap((exp) => [
      `### ${exp.role}, ${exp.company} (${exp.duration})`,
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
    `- [Contact](${absoluteUrl("/contact")}): Email, phone, LinkedIn and GitHub`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

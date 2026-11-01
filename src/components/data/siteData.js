// Canonical origin used by metadata, the sitemap, robots.txt, llms.txt and
// structured data. Set NEXT_PUBLIC_SITE_URL to pin a custom domain; on Vercel
// the project's production domain is picked up automatically.
const vercelProductionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (vercelProductionHost
    ? `https://${vercelProductionHost}`
    : "https://bhaskarjoshiportfolio.vercel.app")
).replace(/\/+$/, "");

export const absoluteUrl = (path = "/") =>
  path === "/" ? SITE_URL : `${SITE_URL}${path}`;

const githubUsername = "joshibhaskar684";

export const siteData = {
  name: "Bhaskar Joshi",
  nameHindi: "भास्कर जोशी",
  givenName: "Bhaskar",
  familyName: "Joshi",
  githubUsername,
  jobTitle: "Software Engineer",
  company: "Quana",
  title: "Bhaskar Joshi | Software Engineer from Haldwani, Uttarakhand",
  description:
    "Bhaskar Joshi is a Software Engineer at Quana, based in Haldwani, India, building full-stack, backend and cloud systems with Java, Spring Boot, NestJS and AWS.",
  email: "joshibhaskar684@gmail.com",
  image: "/bhaskar-joshi.jpg",
  location: {
    city: "Haldwani",
    cityHindi: "हल्द्वानी",
    region: "Uttarakhand",
    country: "India",
    countryCode: "IN",
    // Wikipedia and Wikidata entries that pin "Haldwani" to the right place.
    sameAs: ["https://en.wikipedia.org/wiki/Haldwani", "https://www.wikidata.org/wiki/Q1707839"],
  },
  education: {
    degree: "B.Tech in Computer Science Engineering",
    school: "Surajmal University",
    city: "Kichha",
    years: "2023 – 2027",
  },
  social: {
    linkedin: "https://www.linkedin.com/in/bhaskar-joshi-ji/",
    github: `https://github.com/${githubUsername}`,
  },
  systemDesignRepo: `https://github.com/${githubUsername}/SystemDesign`,
  knowsAbout: [
    "Software Engineering",
    "Full Stack Development",
    "Backend Development",
    "Cloud Computing",
    "Microservices",
    "System Design",
    "Distributed Systems",
    "Database Migration",
    "Java",
    "Spring Boot",
    "NestJS",
    "Node.js",
    "React",
    "Next.js",
    "Redux",
    "PostgreSQL",
    "MySQL",
    "MongoDB",
    "Redis",
    "Elasticsearch",
    "Supabase",
    "MinIO",
    "Amazon Web Services (AWS)",
    "AWS EC2",
    "AWS RDS",
    "Docker",
    "Kubernetes",
    "Apache Kafka",
    "CI/CD",
    "GitHub Actions",
  ],
  keywords: [
    "Bhaskar Joshi",
    "Bhaskar Joshi Software Engineer",
    "Bhaskar Joshi Quana",
    "Bhaskar Joshi portfolio",
    "Bhaskar Joshi Haldwani",
    "Bhaskar Joshi GitHub",
    githubUsername,
    `${githubUsername} GitHub`,
    "Software Engineer",
    "Software Engineer Haldwani",
    "Full Stack Developer",
    "Full Stack Developer Haldwani",
    "Backend Developer",
    "Cloud Engineer",
    "Java Spring Boot Developer",
    "NestJS Developer",
    "Next.js Developer",
    "AWS",
    "Microservices",
    "Haldwani",
    "Uttarakhand",
  ],
};

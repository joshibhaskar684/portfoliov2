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

export const siteData = {
  name: "Bhaskar Joshi",
  givenName: "Bhaskar",
  familyName: "Joshi",
  jobTitle: "Software Engineer",
  company: "Quana",
  title: "Bhaskar Joshi | Software Engineer – Full Stack, Backend & AWS",
  description:
    "Bhaskar Joshi is a Software Engineer at Quana building scalable full-stack, backend and cloud systems with Java, Spring Boot, NestJS, Next.js, React and AWS.",
  email: "joshibhaskar684@gmail.com",
  image: "/bhaskar.jpg",
  location: {
    city: "Haldwani",
    region: "Uttarakhand",
    country: "India",
    countryCode: "IN",
  },
  education: {
    degree: "B.Tech in Computer Science Engineering",
    school: "Surajmal University",
    city: "Kichha",
    years: "2023 – 2027",
  },
  social: {
    linkedin: "https://www.linkedin.com/in/bhaskar-joshi-ji/",
    github: "https://github.com/joshibhaskar684",
  },
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
    "Software Engineer",
    "Full Stack Developer",
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

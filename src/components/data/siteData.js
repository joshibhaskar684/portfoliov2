// Canonical origin used by metadata, the sitemap, robots.txt, llms.txt and
// structured data. Pinned rather than read from the deployment: the project
// serves several domains, and every one of them must point search engines
// here. next.config.mjs redirects the other domains to it.
export const SITE_URL = "https://www.bhaskarjoshi.online";

export const absoluteUrl = (path = "/") =>
  path === "/" ? SITE_URL : `${SITE_URL}${path}`;

const githubUsername = "joshibhaskar684";
const twitterHandle = "bhaskar_joshii";
const instagramHandle = "bhaskar__joshi__";

// Every public profile. Listed as `sameAs` in structured data and linked
// with rel="me" in the footer, About and Contact pages, which is how search
// engines connect these accounts to this site and to one person.
export const socialProfiles = [
  { id: "linkedin", label: "LinkedIn", handle: "bhaskar-joshi-ji", url: "https://www.linkedin.com/in/bhaskar-joshi-ji/" },
  { id: "github", label: "GitHub", handle: githubUsername, url: `https://github.com/${githubUsername}` },
  { id: "leetcode", label: "LeetCode", handle: githubUsername, url: `https://leetcode.com/u/${githubUsername}/` },
  { id: "twitter", label: "X (Twitter)", handle: `@${twitterHandle}`, url: `https://x.com/${twitterHandle}` },
  { id: "instagram", label: "Instagram", handle: `@${instagramHandle}`, url: `https://www.instagram.com/${instagramHandle}/` },
];

export const siteData = {
  name: "Bhaskar Joshi",
  nameHindi: "भास्कर जोशी",
  givenName: "Bhaskar",
  familyName: "Joshi",
  githubUsername,
  twitterHandle: `@${twitterHandle}`,
  jobTitle: "Software Engineer",
  company: "Quana",
  companyUrl: "https://quana.ai",
  title: "Bhaskar Joshi | Software Engineer at Quana, Haldwani",
  description:
    "Bhaskar Joshi is a Software Engineer at Quana from Haldwani, Uttarakhand, India, building full-stack, backend and cloud systems with Java, Spring Boot, NestJS and AWS.",
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
    "Bhaskar",
    "Bhaskar Joshi",
    "Bhaskar Joshi Software Engineer",
    "Bhaskar Joshi Quana",
    "Bhaskar Joshi Haldwani",
    "Bhaskar Joshi Uttarakhand",
    "Bhaskar Joshi portfolio",
    "Bhaskar Joshi developer",
    "Bhaskar Joshi VhBuyio",
    "Bhaskar Joshi GitHub",
    "Bhaskar Joshi LeetCode",
    "Bhaskar Joshi LinkedIn",
    githubUsername,
    twitterHandle,
    instagramHandle,
    "Quana",
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

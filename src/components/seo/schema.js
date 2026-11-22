import { SITE_URL, absoluteUrl, siteData, socialProfiles } from "@/components/data/siteData";
import { experienceData } from "@/components/data/experienceData";
import { faqData } from "@/components/data/faqData";

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const BLOG_ID = `${SITE_URL}/blog#blog`;

function organization(name, url) {
  return { "@type": "Organization", name, ...(url && { url }) };
}

// Earlier employers, once each, most recent first.
function previousEmployers() {
  const seen = new Set([siteData.company]);
  return experienceData.flatMap(({ company, companyUrl }) => {
    if (seen.has(company)) return [];
    seen.add(company);
    return [organization(company, companyUrl)];
  });
}

function personSchema() {
  const {
    name,
    nameHindi,
    givenName,
    familyName,
    jobTitle,
    company,
    companyUrl,
    description,
    email,
    image,
    location,
    education,
    knowsAbout,
  } = siteData;

  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name,
    // Profile handles (Google's ProfilePage docs use alternateName for
    // handles) and the Hindi spelling, so searches for any resolve here.
    alternateName: [...new Set(socialProfiles.map(({ handle }) => handle.replace(/^@/, ""))), nameHindi],
    givenName,
    familyName,
    url: SITE_URL,
    image: {
      "@type": "ImageObject",
      url: absoluteUrl(image),
      caption: `${name}, ${jobTitle} based in ${location.city}, ${location.region}`,
    },
    email,
    jobTitle,
    description,
    worksFor: organization(company, companyUrl),
    // schema.org allows any Organization here, not only schools.
    alumniOf: previousEmployers(),
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: education.school,
      address: {
        "@type": "PostalAddress",
        addressLocality: education.city,
        addressRegion: location.region,
        addressCountry: location.countryCode,
      },
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: location.city,
      addressRegion: location.region,
      addressCountry: location.countryCode,
    },
    homeLocation: {
      "@type": "City",
      name: location.city,
      alternateName: location.cityHindi,
      sameAs: location.sameAs,
      containedInPlace: {
        "@type": "State",
        name: location.region,
        containedInPlace: { "@type": "Country", name: location.country },
      },
    },
    knowsAbout,
    sameAs: socialProfiles.map(({ url }) => url),
  };
}

function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: siteData.name,
    alternateName: [`${siteData.name} Portfolio`, new URL(SITE_URL).hostname.replace(/^www\./, "")],
    description: siteData.description,
    inLanguage: "en",
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
  };
}

// `type` is a schema.org WebPage subtype: ProfilePage, AboutPage, ContactPage or CollectionPage.
export function webPageSchema({ type, path, name, description }) {
  return {
    "@type": type,
    "@id": `${SITE_URL}${path}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": PERSON_ID },
    mainEntity: { "@id": PERSON_ID },
  };
}

// Defaults to the site-wide FAQ on the home page.
export function faqPageSchema({ faqs = faqData, path = "/" } = {}) {
  return {
    "@type": "FAQPage",
    "@id": `${SITE_URL}${path}#faq`,
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

// A topic a post is about. CVE ids link to their official record so search
// engines and AI assistants resolve them to the right vulnerability.
function topic(name) {
  return {
    "@type": "Thing",
    name,
    ...(/^CVE-\d{4}-\d+$/.test(name) && { sameAs: `https://www.cve.org/CVERecord?id=${name}` }),
  };
}

function blogReference(name) {
  return { "@type": "Blog", "@id": BLOG_ID, name, url: absoluteUrl("/blog") };
}

// The blog itself, listing every post, for the /blog page.
export function blogSchema({ name, description, blogs }) {
  return {
    ...blogReference(name),
    description,
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE_ID },
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    blogPost: blogs.map((blog) => ({
      "@type": "BlogPosting",
      "@id": `${SITE_URL}/blog/${blog.id}#article`,
      headline: blog.title,
      url: absoluteUrl(`/blog/${blog.id}`),
      datePublished: blog.date,
    })),
  };
}

// Takes a post from getBlogById(); `blogName` is the blog it belongs to.
export function blogPostingSchema(blog, blogName) {
  const path = `/blog/${blog.id}`;

  return {
    "@type": "BlogPosting",
    "@id": `${SITE_URL}${path}#article`,
    url: absoluteUrl(path),
    mainEntityOfPage: absoluteUrl(path),
    headline: blog.title,
    description: blog.description,
    datePublished: blog.date,
    dateModified: blog.updated ?? blog.date,
    articleSection: blog.tags[0],
    keywords: [...blog.tags, ...blog.keywords],
    about: blog.about.map(topic),
    wordCount: blog.wordCount,
    timeRequired: `PT${blog.readingTime}M`,
    image: blog.cover?.startsWith("http") ? blog.cover : absoluteUrl(blog.cover ?? `${path}/opengraph-image`),
    inLanguage: "en",
    isPartOf: blogReference(blogName),
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
  };
}

// `parent` ({ path, name }) adds a middle crumb, e.g. Home > Blog > Post.
export function breadcrumbSchema(path, name, parent) {
  const crumbs = [{ name: "Home", item: SITE_URL }];
  if (parent) crumbs.push({ name: parent.name, item: absoluteUrl(parent.path) });
  crumbs.push({ name, item: absoluteUrl(path) });

  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({ "@type": "ListItem", position: index + 1, ...crumb })),
  };
}

// Every page ships one graph that includes the site-wide WebSite and Person
// nodes, so its page nodes can reference them by @id.
export function jsonLdGraph(...nodes) {
  return {
    "@context": "https://schema.org",
    "@graph": [websiteSchema(), personSchema(), ...nodes],
  };
}

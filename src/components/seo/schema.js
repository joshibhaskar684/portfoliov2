import { SITE_URL, absoluteUrl, siteData } from "@/components/data/siteData";
import { faqData } from "@/components/data/faqData";

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

function personSchema() {
  const { name, givenName, familyName, githubUsername, jobTitle, company, description, email, image, location, education, social, knowsAbout } =
    siteData;

  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name,
    // Google's ProfilePage docs use alternateName for the person's handle.
    alternateName: githubUsername,
    givenName,
    familyName,
    url: SITE_URL,
    image: absoluteUrl(image),
    email,
    jobTitle,
    description,
    worksFor: { "@type": "Organization", name: company },
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
    knowsAbout,
    sameAs: [social.linkedin, social.github],
  };
}

function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: siteData.name,
    alternateName: `${siteData.name} Portfolio`,
    description: siteData.description,
    inLanguage: "en",
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
  };
}

// `type` is a schema.org WebPage subtype: ProfilePage, AboutPage or ContactPage.
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

export function faqPageSchema() {
  return {
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: faqData.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

export function breadcrumbSchema(path, name) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name, item: absoluteUrl(path) },
    ],
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

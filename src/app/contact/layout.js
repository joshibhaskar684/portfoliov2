import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata } from "@/components/seo/metadata";
import { breadcrumbSchema, jsonLdGraph, webPageSchema } from "@/components/seo/schema";

const title = "Contact";
const description =
  "Get in touch with Bhaskar Joshi, Software Engineer at Quana, by email, phone, LinkedIn or GitHub to discuss projects, roles and collaborations.";

// The contact page is a client component, so its metadata and structured
// data are declared here instead.
export const metadata = pageMetadata({ title, description, path: "/contact" });

export default function ContactLayout({ children }) {
  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          webPageSchema({ type: "ContactPage", path: "/contact", name: `${title} | Bhaskar Joshi`, description }),
          breadcrumbSchema("/contact", title)
        )}
      />
      {children}
    </>
  );
}

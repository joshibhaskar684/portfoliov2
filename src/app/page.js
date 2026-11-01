import Home from "../components/HomeCompnents/Home";
import { siteData } from "@/components/data/siteData";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata } from "@/components/seo/metadata";
import { faqPageSchema, jsonLdGraph, webPageSchema } from "@/components/seo/schema";

export const metadata = pageMetadata({ description: siteData.description, path: "/" });

export default function page() {
  return (
   <>
   <JsonLd
     data={jsonLdGraph(
       webPageSchema({ type: "ProfilePage", path: "/", name: siteData.title, description: siteData.description }),
       faqPageSchema()
     )}
   />
   <Home/>
   </>
  );
}

import Image from "next/image";
import Link from "next/link";
import { siteData, socialProfiles } from "@/components/data/siteData";

const AUTHOR_PROFILES = ["linkedin", "github"];

// Shown under every post. rel="author" and rel="me" tie the article to this
// person and their profiles for search engines and AI assistants.
export default function AuthorCard() {
  const { name, jobTitle, company, companyUrl, description, image, location } = siteData;
  const profiles = socialProfiles.filter(({ id }) => AUTHOR_PROFILES.includes(id));

  return (
    <aside
      aria-label="About the author"
      className="mt-16 flex flex-col sm:flex-row gap-6 items-start bg-foreground/5 border border-foreground/10 rounded-2xl p-6"
    >
      <Image
        src={image}
        alt={name}
        width={80}
        height={80}
        className="w-20 h-20 shrink-0 rounded-full object-cover object-top border-2 border-blue-600"
      />
      <div>
        <p className="text-sm text-foreground/60 mb-1">Written by</p>
        <Link href="/about" rel="author" className="text-xl font-bold hover:text-blue-600 transition-colors">
          {name}
        </Link>
        <p className="text-foreground/70 mt-1">
          {jobTitle} at{" "}
          <a href={companyUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
            {company}
          </a>{" "}
          · {location.city}, {location.region}
        </p>
        <p className="mt-3 text-foreground/80 leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4 text-sm font-semibold">
          <Link href="/about" className="text-blue-600 hover:text-blue-700 transition-colors">
            About me
          </Link>
          <Link href="/contact" className="text-blue-600 hover:text-blue-700 transition-colors">
            Contact
          </Link>
          {profiles.map(({ id, label, url }) => (
            <a
              key={id}
              href={url}
              target="_blank"
              rel="me noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}

import Link from "next/link";
import { socialProfiles } from "@/components/data/siteData";
import { socialIcons } from "@/components/SocialLinks/socialIcons";

export default function Footer() {
  return (
    <footer className="w-full bg-background text-foreground border-t border-gray-200 dark:border-gray-800 py-8 mt-12">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Copyright & Branding */}
        <div className="text-sm md:text-base text-foreground/70 text-center md:text-left">
          <p>
            © {new Date().getFullYear()} Developed by{" "}
            <Link
              href="/"
              className="font-bold text-foreground hover:text-blue-600 transition-colors duration-300"
            >
              Bhaskar Joshi
            </Link>. All rights reserved.
          </p>
          <p className="mt-1">Software Engineer · Haldwani, Uttarakhand, India</p>
          <nav aria-label="Footer" className="flex justify-center md:justify-start gap-5 mt-3 font-semibold">
            {[
              { label: "About", href: "/about" },
              { label: "Blog", href: "/blog" },
              { label: "Contact", href: "/contact" },
            ].map(({ label, href }) => (
              <Link key={href} href={href} className="hover:text-blue-600 transition-colors duration-300">
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Social / Contact Links */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          
          {socialProfiles.map(({ id, label, url }) => {
            const Icon = socialIcons[id];
            return (
              <a
                key={id}
                href={url}
                target="_blank"
                rel="me noopener noreferrer"
                className="text-foreground/60 hover:text-blue-600 transition-transform duration-300 hover:scale-110"
              >
                <span className="sr-only">{label}</span>
                <Icon className="w-6 h-6" aria-hidden="true" />
              </a>
            );
          })}

          {/* Email */}
          <a 
            href="mailto:joshibhaskar684@gmail.com" 
            className="text-foreground/60 hover:text-blue-600 transition-transform duration-300 hover:scale-110"
          >
            <span className="sr-only">Email</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>

        </div>
      </div>
    </footer>
  );
}
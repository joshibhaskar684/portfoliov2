import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import AiBot from "@/components/ai/AiBoat";
import { SITE_URL, siteData } from "@/components/data/siteData";

// Self-hosted by next/font, so no render-blocking request to Google Fonts.
const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin-sans",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: siteData.title,
    template: `%s | ${siteData.name}`,
  },
  description: siteData.description,
  applicationName: siteData.name,
  authors: [{ name: siteData.name, url: SITE_URL }],
  creator: siteData.name,
  publisher: siteData.name,
  keywords: siteData.keywords,
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Google Search Console HTML-tag verification; omitted when unset.
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${josefinSans.variable} h-full antialiased`}
    >
      <body className="">
          <Navbar/>
          {children}
          <Footer/>
          <AiBot/>
      </body>
    </html>
  );
}

import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import AiBot from "@/components/ai/AiBoat";
import { SITE_URL, siteData } from "@/components/data/siteData";
import NextTopLoader from "nextjs-toploader";

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
  // Search Console / Webmaster Tools HTML-tag verification for Google, Bing
  // (which also powers Yahoo, DuckDuckGo and Edge search) and Yandex; each
  // tag is omitted when its variable is unset.
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_SITE_VERIFICATION,
    other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION },
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
         <NextTopLoader
          color="#0004ffff"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #6366f1,0 0 5px #6366f1"
        />
          <Navbar/>
          {children}
          <Footer/>
          <AiBot/>
      </body>
    </html>
  );
}

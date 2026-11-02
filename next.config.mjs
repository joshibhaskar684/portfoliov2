// Must match SITE_URL in src/components/data/siteData.js.
const CANONICAL_ORIGIN = "https://www.bhaskarjoshi.online";

// Other domains attached to this deployment. They permanently redirect to the
// canonical domain so search engines index one copy of the site and merge
// any ranking signals the old addresses had earned.
const ALTERNATE_HOSTS = ["bhaskarjoshi.quicksin.in", "bhaskarjoshiportfolio.vercel.app"];

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return ALTERNATE_HOSTS.map((host) => ({
      source: "/:path*",
      has: [{ type: "host", value: host }],
      destination: `${CANONICAL_ORIGIN}/:path*`,
      permanent: true,
    }));
  },
  async rewrites() {
    // Browsers and crawlers request /favicon.ico without reading the page, so
    // serve the generated icon there instead of a 404.
    return [{ source: "/favicon.ico", destination: "/icon" }];
  },
};

export default nextConfig;

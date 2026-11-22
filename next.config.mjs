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
};

export default nextConfig;

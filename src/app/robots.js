export default function robots() {
  return {
    rules: [
      {
        userAgent: "facebookexternalhit",
        allow: ["/"],
      },
      {
        userAgent: "Twitterbot",
        allow: ["/"],
      },
      {
        userAgent: "*",
        allow: ["/"],
      },
    ],
    sitemap: "https://takahirofujii.dev/sitemap.xml",
  };
} 
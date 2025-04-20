import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "facebookexternalhit",
        allow: ["/"],
      },
      {
        userAgent: "fmeta-externalagent",
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

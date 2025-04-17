export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Takahiro Fujii",
    alternateName: "藤井 貴浩",
    jobTitle: ["Product Engineer", "Software Engineer", "CTO"],
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    sameAs: ["https://github.com/taka66", "https://twitter.com/taka_ft", "https://www.linkedin.com/in/takahiro-fujii-221a7461/"],
    description: "Product Engineer / Software Engineer / Designer / CTO / Takahiro Fujii / 藤井 貴浩",
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}

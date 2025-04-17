import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header/Header";
import JsonLd from "@/components/JsonLd";
import { ViewportHeightProvider } from "@/components/ViewportHeightProvider/ViewportHeightProvider";
import { AnimatePresence } from "framer-motion";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Takahiro Fujii",
    template: "%s | Takahiro Fujii",
  },
  description: "Product Engineer / Software Engineer / Designer / CTO / Takahiro Fujii / 藤井 貴浩",
  keywords: ["Product Engineer", "Software Engineer", "Designer", "CTO", "Takahiro Fujii", "藤井 貴浩", "Next.js", "React", "TypeScript"],
  authors: [{ name: "Takahiro Fujii" }],
  creator: "Takahiro Fujii",
  publisher: "Takahiro Fujii",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Takahiro Fujii",
    description: "Product Engineer / Software Engineer / Designer / CTO / Takahiro Fujii / 藤井 貴浩",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Takahiro Fujii",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "/ogp.png",
        width: 1200,
        height: 630,
        alt: "Takahiro Fujii",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Takahiro Fujii",
    description: "Product Engineer / Software Engineer / Designer / CTO / Takahiro Fujii / 藤井 貴浩",
    creator: "@taka_ft",
    images: ["/ogp.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ViewportHeightProvider>
          <JsonLd />
          <Header />
          <AnimatePresence mode="wait">{children}</AnimatePresence>
        </ViewportHeightProvider>
      </body>
    </html>
  );
}

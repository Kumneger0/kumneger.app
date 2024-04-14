import React from "react";
import "./../../globals.css";
import NextAuthWrapper from "@/components/nextAuthWrapper";
import BlogHeader from "@/components/blogHeader/blogHeader";
import { Open_Sans } from "next/font/google";
import Providers from "@/components/progressBarContext";
import { Metadata } from "next";

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "Kumneger Wondimu | blog",
  description:
    "Empower your web development journey with our expertly curated blog. Discover insider tips, cutting-edge techniques, and practical insights to craft stunning websites with confidence.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  twitter: {
    title: "Kumneger wondimu",
    card: "summary_large_image"
  },
  other: {
    "google-site-verification": "oDVfNqx1QrRnGvkWz-i646WtX-rsZn1h2J7jdBwyHvU"
  }
};

function Bloglayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={openSans.className}>
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" type="image/ico" href="/1711802150838.ico" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8674305198183882"
          crossOrigin={"anonymous"}
        ></script>
      </head>
      <body>
        <NextAuthWrapper>
          <Providers>
            <BlogHeader />
            <div className="dark min-h-screen  bg-gray-800 text-white">
              <main className=" mx-auto pb-5 px-4 max-w-5xl md:px-6 lg:px-8">
                {children}
              </main>
            </div>
          </Providers>
        </NextAuthWrapper>
      </body>
    </html>
  );
}

export default Bloglayout;

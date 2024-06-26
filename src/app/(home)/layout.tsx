import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import React from "react";
import "./../globals.css";
import Navbar1 from "@/components/header/Header";
import { Open_Sans } from "next/font/google";
import Footer from "@/components/footer/footer";
import Providers from "@/components/progressBarContext";


export const metadata: Metadata = {
  title: "Kumneger Wondimu",
  description: "a passionate full stack developer based in ethiopia",
  openGraph: {
    title: "Kumneger Wondimu",
    description: "Full Stack Developer",
    url: "https://kumneger.vercel.app",
    siteName: "Kumneger wondimu",
    locale: "en_US",
    type: "website"
  },
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

async function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      style={{
        fontFamily: '"Open Sans", sans-serif',
        fontWeight: "400",
        fontStyle: "normal",
        fontVariationSettings: '"wdth" 100'
      }}
    >
      <head>
        <link rel="icon" type="image/ico" href="/1711802150838.ico" />
      </head>
      <body className="overflow-x-hidden  mx-auto dark min-h-screen bg-gray-800 text-white">
        <Providers>
          <Navbar1 />
          <main className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
            {children}
          </main>
          <Analytics />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
export default PortfolioLayout;

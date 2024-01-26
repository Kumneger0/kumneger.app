import "../globals.css";
import "./portifolio.css";
import React from "react";
import Header from "@/components/header/Header";
import Footer from "@/components/blogFooter/Footer";
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Portifolio | Kumneger Wondimu",
  description: "a passionate full stack developer based in ethiopia",
  other: {
    "google-site-verification": "oDVfNqx1QrRnGvkWz-i646WtX-rsZn1h2J7jdBwyHvU",
  },
};

function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className="overflow-x-hidden">
        <Header />
        <main className="max-w-7xl mx-auto font-serif">{children}</main>
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}

export default PortfolioLayout;

import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import React from "react";
import "./../globals.css";
import Navbar1 from "@/components/header/Header";

export const metadata: Metadata = {
  title: "Portifolio | Kumneger Wondimu",
  description: "a passionate full stack developer based in ethiopia",
  other: {
    "google-site-verification": "oDVfNqx1QrRnGvkWz-i646WtX-rsZn1h2J7jdBwyHvU"
  }
};

function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className="overflow-x-hidden dark min-h-screen bg-gray-800 text-white">
            <Navbar1 />
            <main className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
              {children}
            </main>
        <Analytics />
      </body>
    </html>
  );
}

export default PortfolioLayout;

import "../globals.css";
import "./portifolio.css";
import React from "react";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portifolio | Kumneger Wondimu",
  description: "a passionate full stack developer based in ethiopia",
};

function PortifolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

export default PortifolioLayout;

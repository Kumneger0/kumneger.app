import "../../globals.css";
import React from "react";
import BlogHeader from "./blogHeader";
import { Metadata } from "next";
import Footer from "@/components/footer/footer";

export const metadata: Metadata = {
  title: "Blog | Kumneger Wondimu",
  description: "Blog About Programming",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <BlogHeader />
        <main className="text-white bg-gray-900">
          <div className="w-11/12 mx-auto">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}

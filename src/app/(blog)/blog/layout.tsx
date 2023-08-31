import "../../globals.css";
import React from "react";
import BlogHeader from "./blogHeader";
import { Metadata } from "next";
import Footer from "@/components/blogFooter/Footer";
import { Analytics } from "@vercel/analytics/react";


export const metadata: Metadata = {
  title: "Blog | Kumneger Wondimu",
  description:
    "Discover insightful articles and valuable resources to enhance your knowledge. Stay up-to-date with the latest trends, tips, and industry news. Explore a wide range of topics and find inspiration for your own writing",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <BlogHeader />
        <main className="text-white bg-gray-900 overflow-x-hidden w-screen justify-center flex">
          <div className="w-11/12 mx-auto border-green-400">{children}</div>
          <Analytics mode="production" />
        </main>
        <Footer />
      </body>
    </html>
  );
}

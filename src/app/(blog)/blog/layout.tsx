import Footer from "@/components/blogFooter/Footer";
import NextAuthWrapper from "@/components/nextAuthWrapper";
import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import React from "react";
import BlogHeader from "../../../components/blogHeader/blogHeader";
import "../../globals.css";

export const metadata: Metadata = {
  title: "Blog | Kumneger Wondimu",
  description:
    "Discover insightful articles and valuable resources to enhance your knowledge. Stay up-to-date with the latest trends, tips, and industry news. Explore a wide range of topics and find inspiration for your own writing",

};

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <NextAuthWrapper>
          <BlogHeader />
          <main className="text-white bg-gray-900 overflow-x-hidden w-screen justify-center flex">
            <div className="w-11/12 mx-auto border-green-400">{children}</div>
            <Analytics mode="production" />
          </main>
          <Footer />
        </NextAuthWrapper>
      </body>
    </html>
  );
}

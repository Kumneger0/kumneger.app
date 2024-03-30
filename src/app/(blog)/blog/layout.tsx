import React from "react";
import "./../../globals.css";
import NextAuthWrapper from "@/components/nextAuthWrapper";
import BlogHeader from "@/components/blogHeader/blogHeader";
import { Open_Sans } from "next/font/google";
import Providers from "@/components/progressBarContext";

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap"
});

function Bloglayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={openSans.className}>
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" type="image/ico" href="/1711802150838.ico" />
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

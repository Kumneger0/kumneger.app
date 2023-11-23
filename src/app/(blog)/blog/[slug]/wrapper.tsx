"use client";
import Blog from "./blog";
import React from "react";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { SessionProvider } from "next-auth/react";
import Comments from "@/components/comments";


function Wrapper({ children }: { children: MDXRemoteSerializeResult }) {
  return <>
    <SessionProvider>
      <Blog blogContent={children} />;
      <Comments />
    </SessionProvider>

  </>

}

export default Wrapper;

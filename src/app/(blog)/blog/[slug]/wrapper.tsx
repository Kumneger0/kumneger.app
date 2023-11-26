"use client";
import Blog from "./blog";
import React from "react";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { SessionProvider } from "next-auth/react";
import Comments from "@/components/comments";


function Wrapper({ children, asset_id }: { children: MDXRemoteSerializeResult, asset_id: string }) {
  return <>
    <SessionProvider>
      <Blog blogContent={children} />
      <Comments asset_id={asset_id} />
    </SessionProvider>

  </>

}

export default Wrapper;

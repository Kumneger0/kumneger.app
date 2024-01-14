"use client";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

import Blog from "./blog";


import { SessionProvider } from "next-auth/react";



function Wrapper({ children }: { children: MDXRemoteSerializeResult }) {
  return <>
    <SessionProvider>
      <Blog blogContent={children} />

    </SessionProvider>

  </>
}
export default Wrapper;
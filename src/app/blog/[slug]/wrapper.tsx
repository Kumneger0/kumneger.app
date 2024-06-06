"use client";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

import Blog from "../../../components/blog";

import { SessionProvider } from "next-auth/react";

function Wrapper({ children }: { children: MDXRemoteSerializeResult }) {
  return (
    <>
      <Blog blogContent={children} />
    </>
  );
}
export default Wrapper;

export { SessionProvider as NextAuthWrapper };

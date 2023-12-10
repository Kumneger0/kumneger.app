"use client";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import Blog from "./blog";
function Wrapper({ children, }: { children: MDXRemoteSerializeResult, }) {
  return <>
    <Blog blogContent={children} />
  </>
}
export default Wrapper;
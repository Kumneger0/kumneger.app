"use client";
import Blog from "./blog";
import React from "react";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

function Wrapper({ children }: { children: MDXRemoteSerializeResult }) {
  return <Blog>{children}</Blog>;
}

export default Wrapper;

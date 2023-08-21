"use client";
import React from "react";
import type { MDXComponents } from "mdx/types.js";
import { Heading, Paragraph, Code } from "../components/components";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

const components = {
  h1: Heading,
  p: Paragraph,
  code: Code,
} as MDXComponents;

function Blog({ blogContent }: { blogContent: MDXRemoteSerializeResult }) {
  return (
    <div className="max-w-5xl max-[900px]:w-11/12 mx-auto">
      <MDXRemote {...blogContent} components={components} />
    </div>
  );
}

export default Blog;

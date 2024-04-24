import React from "react";
import type { MDXComponents } from "mdx/types.js";
import {
  Code,
  Heading,
  Heading2,
  LinkComponent,
  Paragraph,
  Strong,
  UL,
  Li
} from "@/mdxComponents/components";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

export const components = {
  h1: Heading,
  p: Paragraph,
  code: Code,
  a: LinkComponent,
  h2: Heading2,
  strong: Strong,
  ul: UL,
  li: Li
} as MDXComponents;

function Blog({ blogContent }: { blogContent: MDXRemoteSerializeResult }) {
  return (
    <div className="max-w-7xl w-full mx-auto">
      <MDXRemote {...blogContent} components={components} />
    </div>
  );
}

export default Blog;

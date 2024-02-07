"use client";
import { Button } from "@/components/ui/button";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { components } from "../../app/blog/[slug]/blog";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

export type TBlogs = {
  title: string;
  content: MDXRemoteSerializeResult;
  data: {
    title: string;
    author: string;
    date: string;
    year: number;
    month: number;
    day: number;
    asset_id: string;
  };
}[];

function Blogs({ blogs, className }: { blogs?: TBlogs; className: string }) {
  return (
    <>
      {blogs?.map(({ title, content, data }, index) => {
        const blogCOntent = content as unknown as MDXRemoteSerializeResult;
        return (
          <li className="py-4 w-full md:w-2/3">
            <Card>
              <CardHeader>
                <CardTitle>{data?.title}</CardTitle>
                <CardDescription>
                  <MDXRemote
                    {...blogCOntent}
                    // @ts-ignore
                    components={{ ...components }}
                  />
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link scroll={true} href={`/blog/${data.asset_id}`}>
                  Read More
                </Link>
              </CardContent>
            </Card>
          </li>
        );
      })}
    </>
  );
}

export default Blogs;

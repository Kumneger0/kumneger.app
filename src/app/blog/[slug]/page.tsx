import { getAllBlogsFromCloundnary, getBlogBySlug } from "@/utils/utils";
import { Metadata } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Link from "next/link";
import { FaBackward } from "react-icons/fa";
import Blog from "./wrapper";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoginModal } from "@/components/blogHeader/blogHeader";

type TPrams = { params: { slug: string } };

export const dynamic = "force-static";

export default async function BlogSlug({ params }: TPrams) {
  const asset_id = params.slug;
  const { data, content } = await getBlogBySlug(asset_id);
  if (!data || !content) {
    console.log("not found");
    notFound();
  }
  const serialized = content ? await serialize(content) : null;

  const blogTitle =
    data && "title" in data && typeof data.title === "string" ? data.title : "";

  return (
    <div className="dark min-h-screen bg-gray-800 text-white flex items-center justify-center">
      <header className="fixed top-0 z-10 bg-gray-800  w-full">
        <div className="container mx-auto px-4 py-4 md:px-6 lg:px-8">
          <h1 className="text-2xl font-bold">Kumneger's Blog</h1>
        </div>
      </header>
      <main className="container max-w-5xl mx-auto px-4  md:px-6 lg:px-8">
        <section className="mt-12">
          <div className="flex justify-between">
            <Link className="underline text-blue-400" href="#">
              Back to Blog
            </Link>
            <LoginModal>sign in</LoginModal>
          </div>
          <h1 className="text-4xl font-bold text-center mt-6">{blogTitle}</h1>

          <div>
            <img
              width={1000}
              height={6000}
              src={`/api/gen-og-images/${blogTitle}`}
              alt="header"
            />
          </div>
          <Card className="border-none">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div className="text-gray-400">
                  <p>
                    Published on: <span className="font-bold">Feb 6, 2024</span>
                  </p>
                  <p>
                    Author: <span className="font-bold">John Doe</span>
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {!!serialized && <Blog>{serialized}</Blog>}
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}

/*
  <section className="mt-12">
          <h2 className="text-3xl font-bold text-center">Comments</h2>
          <Card className="w-full border-none">
            <CardHeader>
              <CardTitle>John Doe</CardTitle>
              <CardDescription>
                Great article! Really helped me understand React Hooks.
              </CardDescription>
            </CardHeader>
            <CardContent className="w-full">
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <Button>Upvote</Button>
                  <Button>Downvote</Button>
                  <Button>Delete</Button>
                  <Button>Reply</Button>
                </div>
              </div>
              <Card className="ml-0 border-none md:ml-0 lg:ml-0 w-full">
                <CardHeader>
                  <CardTitle>Jane Doe</CardTitle>
                  <CardDescription>
                    I agree, this was very helpful!
                  </CardDescription>
                </CardHeader>
                <CardContent className="w-full border-none">
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <Button>Upvote</Button>
                      <Button>Downvote</Button>
                      <Button>Delete</Button>
                      <Button>Reply</Button>
                    </div>
                  </div>
                  <Card className="ml-0 md:ml-0 lg:ml-0 w-full border-none">
                    <CardHeader>
                      <CardTitle>John Smith</CardTitle>
                      <CardDescription>
                        Thanks for the insights!
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="w-full">
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-2">
                          <Button>Upvote</Button>
                          <Button>Downvote</Button>
                          <Button>Delete</Button>
                          <Button>Reply</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
          <section className="mt-12">
            <h2 className="text-3xl font-bold text-center">Add a Comment</h2>
            <Card>
              <CardContent>
                <form className="space-y-4">
                  <input
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Your Name"
                    type="text"
                  />
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Your Comment"
                    rows={4}
                  />
                  <Button type="submit">Post Comment</Button>
                </form>
              </CardContent>
            </Card>
          </section>
        </section>


*/

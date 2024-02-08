import { LoginModal } from "@/components/blogHeader/blogHeader";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getAllBlogsFromCloundnary, getBlogBySlug } from "@/utils/utils";
import { serialize } from "next-mdx-remote/serialize";
import Link from "next/link";
import { notFound } from "next/navigation";
import Blog from "./wrapper";
import { Metadata } from "next";

type TPrams = { params: { slug: string } };

export const dynamic = "force-static";

export async function generateStaticParams() {
  return (await getAllBlogsFromCloundnary()).map(({ asset_id }) => ({
    slug: asset_id
  }));
}

export async function generateMetadata({ params }: TPrams): Promise<Metadata> {
  const asset_id = params.slug;
  const { data } = await getBlogBySlug(asset_id);
  return {
    title: data?.title,
    description: data?.seoDescription,
    openGraph: {
      images: [{ url: `/api/gen-og-images/${data?.title}` }]
    }
  };
}

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
      <main className="container max-w-5xl mx-auto px-4  md:px-6 lg:px-8">
        <section className="mt-12">
          <Link className="underline text-blue-400" href="/blog">
            Back to Blog
          </Link>
          <h1 className="text-2xl py-3 md:text-3xl font-bold text-center mt-6">
            {blogTitle}
          </h1>

          <div>
            <img
              width={1000}
              height={6000}
              src={`/api/gen-og-images/${blogTitle}`}
              alt="header"
            />
          </div>

          <div className="flex w-full justify-between items-center">
            <div className="text-gray-400">
              <p>
                Published on: <span className="font-bold">{data.date}</span>
              </p>
              <p>
                Author: <span className="font-bold">{data.author}</span>
              </p>
            </div>
          </div>

          {!!serialized && <Blog>{serialized}</Blog>}
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

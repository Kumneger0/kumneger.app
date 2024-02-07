import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { getSampleRelatedArticles } from "@/utils/utils";
import { serialize } from "next-mdx-remote/serialize";
import Link from "next/link";
import Blogs, { TBlogs } from "../../components/blogs/Blogs";

export const dynamic = "force-static";

// async function Home() {
//   const blogs = await getSampleRelatedArticles();
//   const serializedBlog = await Promise.all<TBlogs[]>(
//     //@ts-expect-error I will figure out later
//     blogs?.map(async ({ content, data }) => ({
//       title: data.title,
//       content: await serialize(content.slice(0, 200)),
//       data
//     })) as unknown as TBlogs
//   );

//   return (
//     <>
//       <div className="w-11/12 mx-auto flex min-h-screen flex-col items-center p-5">
//         <div className="w-11/12 max-w-6xl mx-auto my-5 font-bold text-xl">
//           Latest Articles
//         </div>
//
//         <Blogs className="justify-center" blogs={serializedBlog} />
//       </div>
//     </>
//   );
// }

// export default Home;
export default async function Home() {
  const blogs = await getSampleRelatedArticles();
  const serializedBlog = await Promise.all<TBlogs[]>(
    //@ts-expect-error I will figure out later
    blogs?.map(async ({ content, data }) => ({
      title: data.title,
      content: await serialize(content.slice(0, 200)),
      data
    })) as unknown as TBlogs
  );

  return (
    <div className="dark min-h-screen bg-gray-800 text-white flex flex-col">
      <header className="fixed top-0 z-10 bg-gray-800  w-full">
        <div className="container mx-auto px-4 py-4 md:px-6 lg:px-8">
          <h1 className="text-2xl font-bold">Kumneger's Blog</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 mt-12 md:px-6 lg:px-8 flex-1 overflow-y-auto">
        <section className="">
          <ul className="flex flex-col items-center">
            {/* @ts-ignore */}
            <Blogs className="justify-center" blogs={serializedBlog} />
          </ul>
          <div className="mt-6 flex justify-center">
            <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Load More
            </Button>
          </div>
        </section>
        <section className="mt-12">
          <h2 className="text-3xl font-bold text-center">Contact</h2>
          <div className="mt-4 text-center">
            <p className="text-lg text-gray-300">
              If you want to get in touch with me, feel free to send me an email
              at
              <a className="underline text-blue-400" href="#">
                your-email@example.com
              </a>
              .
            </p>
          </div>
        </section>
        <section className="mt-12">
          <h2 className="text-3xl font-bold text-center">Social Media</h2>
          <div className="flex space-x-4 mt-4 justify-center">
            <Link href="#">
              <img alt="Twitter" className="w-6 h-6" src="/placeholder.svg" />
            </Link>
            <Link href="#">
              <img alt="LinkedIn" className="w-6 h-6" src="/placeholder.svg" />
            </Link>
            <Link href="#">
              <img alt="GitHub" className="w-6 h-6" src="/placeholder.svg" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

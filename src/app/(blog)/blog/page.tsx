import { getSampleRelatedArticles } from "@/utils/utils";
import Link from "next/link";
import Blogs from "../../../components/blogs/Blogs";
import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Kumneger Wondimu | blog"
};

export default async function Home() {
  const blogs = await getSampleRelatedArticles();

  return (
    <div className="dark min-h-screen bg-gray-800 text-white flex flex-col">
      <main className=" mx-auto px-4 mt-12 md:px-6 lg:px-8 flex-1 overflow-y-auto">
        <section className="">
          <ul className="flex flex-col items-center">
            <Blogs className="bg-gray-700 my-2 rounded-xl" blogs={blogs} />
          </ul>
        </section>
      </main>
    </div>
  );
}

import Blogs from "@/components/blogs/Blogs";
import {
  getAllBlogsFromCloundnary,
  getSampleRelatedArticles
} from "@/utils/utils";
import { GithubIcon, Linkedin } from "lucide-react";
import { serialize } from "next-mdx-remote/serialize";
import Link from "next/link";
import React from "react";

export const dynamic = "force-static";

export async function generateStaticParams() {
  return (await getAllBlogsFromCloundnary()).map(({ asset_id }) => ({
    slug: asset_id
  }));
}

async function Page({ params }: { params: { slug: string } }) {
  const blogs = await getSampleRelatedArticles(params.slug, 3);

  return (
    <div className="space-y-4  sm:ml-auto  mt-12 max-w-6xl w-full  mx-auto">
      <h2 className="text-2xl font-bold w-full text-center">
        Related Articles
      </h2>
      {/* @ts-ignore */}
      <ul className="flex flex-col items-center">
        <Blogs className="bg-gray-700 rounded-xl" blogs={blogs} />
      </ul>
      <div className="w-full text-center flex justify-center items-center gap-2">
        <div>Find an issue with this page?</div>
        <Link
          target="_blank"
          className="text-blue-500"
          href={
            "https://github.com/Kumneger0/portifolio-website/edit/main/src/app/(blog)/blog/%5Bslug%5D/page.tsx"
          }
        >
          Fix it on GitHub
        </Link>
      </div>
      <div>
        <div className="flex space-x-4 mt-4 w-full justify-center items-center">
          <Link
            className="text-blue-400 underline"
            href="https://twitter.com/kumneger0"
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              className="h-10 w-10 "
              y="0px"
              viewBox="0 0 50 50"
            >
              <path d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z"></path>
            </svg>
          </Link>
          <Link
            target="_blank"
            className="text-blue-400 underline"
            href="https://www.linkedin.com/in/kumneger-wondimu-2b8405241/"
          >
            <Linkedin className="h-10 w-10" />
          </Link>
          <Link
            target="_blank"
            className="text-blue-400 underline"
            href="https://github.com/kumneger0"
          >
            <GithubIcon className="text-white w-10 h-10" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Page;

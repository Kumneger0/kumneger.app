import { getSampleRelatedArticles } from "@/utils/utils";
import { serialize } from "next-mdx-remote/serialize";
import Blogs, { TBlogs } from "./allPosts/Blogs";


async function Home() {
  const blogs = await getSampleRelatedArticles();
  const serializedBlog = await Promise.all<TBlogs[]>(
    blogs?.map(async ({ title, content, data }) => ({
      title,
      content: await serialize(content.slice(0, 200)),
      data
    })) as unknown as TBlogs[]
  );

  return (
    <>
      <div className="w-11/12 mx-auto flex min-h-screen flex-col items-center p-5">
        <div className="w-11/12 max-w-6xl mx-auto my-5 font-bold text-xl">
          Latest Articles
        </div>
        <Blogs className="justify-center" blogs={serializedBlog} />
      </div>
    </>
  );
}

export default Home;

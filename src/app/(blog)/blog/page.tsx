import { getSampleRelatedArticles } from "@/utils/utils";
import { serialize } from "next-mdx-remote/serialize";
import Blogs, { TBlogs } from "./allPosts/Blogs";



console.log(process.env.CLOUD_NAME)

async function Home() {
  const blogs = await getSampleRelatedArticles();
  const serializedBlog = await Promise.all<TBlogs[]>(
    //@ts-expect-error i will figure out later
    blogs?.map(async ({ title, content, data }) => ({
      title: data.title,
      content: await serialize(content.slice(0, 200)),
      data
    })) as unknown as TBlogs
  );

  return (
    <>
      <div className="w-11/12 mx-auto flex min-h-screen flex-col items-center p-5">
        <div className="w-11/12 max-w-6xl mx-auto my-5 font-bold text-xl">
          Latest Articles
        </div>
        {/* @ts-ignore */}
        <Blogs className="justify-center" blogs={serializedBlog} />
      </div>
    </>
  );
}

export default Home;

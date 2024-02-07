import { env } from "@/server/env";
import cloudinary, { ResourceApiResponse, v2 } from "cloudinary";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { db } from "./db";

v2.config({
  cloud_name: env.cloud_name,
  api_key: env.api_key,
  api_secret: env.api_secret,
  secure: true
});

const seoDesctiptionsForAtriclesThatHaveNoSeoDescription = {
  ec640e0c27eaac4c5f68874b42606e37:
    "Discover how to build a peer-to-peer video call app from scratch. Learn the latest in P2P technology and enhance your web development skills.",
  f5741adffcb5ac3ddaf32dfa2677a0b1:
    "Learn how to resolve 'Rendered more hooks than during the previous render' errors in React. Our guide provides solutions for accidental early return statements affecting hook rendering",
  a333cdd959cdc14f68a5540b70cae98f:
    "Explore the power of screen capture with `navigator.mediaDevices.getDisplayMedia`. Learn how to implement screen sharing in web apps, enhancing collaboration and productivity",
  "9086fc7f65195c918ed70636078f7805":
    "Boost user experience with our guide on clipboard access in JavaScript. Discover how to create intuitive 'Copy to Clipboard' features, making it easier for users to interact with your web content"
};

interface resources extends ResourceApiResponse {
  public_id: string;
  secure_url: string;
  asset_id: string;
}

type TGetBlogParam = {
  url: string;
  asset_id: string;
};

const getBlogContent = async (urls: TGetBlogParam[]) => {
  const fetchContent = async ({ url, asset_id }: TGetBlogParam) => {
    const rawMdx = await fetch(url).then((res) => res.text());
    return { rawMdx, asset_id };
  };
  const allText = await Promise.allSettled(urls.map(fetchContent));

  const blogs = allText.map((result) =>
    result.status === "fulfilled" ? result.value : null
  );
  return blogs;
};

const getAllBlogsFromCloundnary = async () => {
  try {
    const folder: { resources: resources[] } =
      await cloudinary.v2.api.search("folder:blogs/*");
    const blogs = folder.resources.filter(
      (res) => res.public_id.split(".")[1]?.toLowerCase().trim() === "mdx"
    );
    const blogSecureUrl = blogs.map((blog) => ({
      url: blog?.secure_url,
      asset_id: blog.asset_id
    }));
    return blogSecureUrl;
  } catch (err) {
    console.log(err);
    throw new Error("there was an error occured");
  }
};

const getBlogFromCloundnary = async (asset_id: string) => {
  let rawMdx: string | null = null;
  console.log(asset_id);
  try {
    const blog = await cloudinary.v2.api.resources_by_asset_ids(asset_id);
    console.log(blog);
    rawMdx = await fetch(blog.resources[0].secure_url).then((res) => {
      console.log(res);
      if (!res.ok) {
        return null;
      }
      return res.text();
    });
    return rawMdx;
  } catch (err) {
    console.log("not found");
    notFound();
  }
};

const getAllBlogs = async () => {
  const dir = `${process.cwd()}/src/blogs`;
  const urls = await getAllBlogsFromCloundnary();
  const blogs = await getBlogContent(urls);
  return blogs as {
    rawMdx: string;
    asset_id: string;
  }[];
};

const getBlogBySlug = async (slug: string) => {
  const blogFromDB = await db.post.findUnique({ where: { asset_id: slug } });
  if (!blogFromDB) {
    notFound();
  }
  const blog = await getBlogFromCloundnary(slug);
  if (!blog) return { data: null, content: null };
  const { data, content } = matter(blog);
  const [year, month, day] = data?.date?.split("/").map(Number);
  const date = new Date(year, month, day).toDateString();
  return {
    content,
    data: {
      ...data,
      asset_id: slug,
      title: data.title,
      date,
      author: "Kumneger Wondimu",
      seoDescription:
        data.seoDescription ??
        seoDesctiptionsForAtriclesThatHaveNoSeoDescription[
          slug as keyof typeof seoDesctiptionsForAtriclesThatHaveNoSeoDescription
        ]
    }
  };
};

const getSampleRelatedArticles = async (
  articleToExclude?: string,
  limit?: number
) => {
  const articles: Array<{
    title: string;
    content: string;
    data: {
      title: string;
      author: string;
      date: string;
      year: number;
      month: number;
      day: number;
      asset_id: string;
      mode?: string;
      seoDescription?: string;
    };
  }> = [];
  const allBlogs = await getAllBlogs();
  // biome-ignore lint/complexity/noForEach:
  allBlogs.forEach((blog) => {
    if (
      (limit && articles.length >= limit) ||
      articleToExclude === blog?.asset_id
    )
      return;
    const { data: config, content } = matter(blog?.rawMdx);
    const data = config as (typeof articles)[number]["data"];
    const [year, month, day] = data?.date?.split("/").map(Number);
    const date = new Date(year, month, day).toDateString();

    const isPreview =
      process.env.NODE_ENV === "development" ? false : data?.mode === "preview";

    if (content && !isPreview) {
      articles.push({
        title: blog.rawMdx.split(".")[0],
        content,
        data: {
          ...data,
          date,
          year,
          month,
          day,
          asset_id: blog.asset_id,
          seoDescription:
            data.seoDescription ??
            seoDesctiptionsForAtriclesThatHaveNoSeoDescription[
              blog.asset_id as keyof typeof seoDesctiptionsForAtriclesThatHaveNoSeoDescription
            ]
        }
      });
    }
  });

  addBlogsTodb(
    articles.map(({ data: { asset_id, title } }) => ({ asset_id, title }))
  );
  return articles.sort((a, b) =>
    a.data.year === b.data.year
      ? a.data.month === b.data.month
        ? b.data.day - a.data.day
        : b.data.month - a.data.month
      : b.data.year - a.data.year
  );
};

async function addBlogsTodb(blogs: { title: string; asset_id: string }[]) {
  try {
    await db.$connect();
    const beforeCreting = await db.post.findMany();

    const newBlogs = blogs.filter(
      ({ asset_id }) =>
        !beforeCreting.some(({ asset_id: aid }) => asset_id === aid)
    );

    await Promise.allSettled(
      newBlogs.map(async ({ asset_id, title }) => {
        const blog = await db.post.create({ data: { asset_id, title } });
        return blog;
      })
    );
  } catch (err) {
    console.error(err);
  }
}

export {
  getAllBlogs,
  getAllBlogsFromCloundnary,
  getBlogBySlug,
  getSampleRelatedArticles
};

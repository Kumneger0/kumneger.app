import { getAllBlogs } from "../utils/utils";

export default async function sitemap() {
  const blogPosts = await getAllBlogs();

  let blogs = await blogPosts.map(({ asset_id }) => ({
    url: `https://kumneger.vercel.app/blog/${asset_id}`,
    lastModified: new Date().toISOString().split("T")[0]
  }));

  let routes = ["", "/blog"].map((route) => ({
    url: `https://kumneger.vercel.app${route}`,
    lastModified: new Date().toISOString().split("T")[0]
  }));

  return [...routes, ...blogs];
}

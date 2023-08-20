import fs from "fs";
import path from "path";

const BlogDir = path.join(__dirname, "../../../../src/blogs");

const getAllBlogs = async () => {
    try {
        const blogs = fs.readdirSync(BlogDir, "utf-8");
        return blogs;
    } catch (err) {
        console.error(err);
    }
};

const getBlogBySlug = (slug: string) => {
    console.log(slug)
    try {
        const all = getAllBlogs()
        console.log(all)
    } catch (err) {
        console.error(err);
        return Error("failed to get blog");
    }
};

export { getAllBlogs, getBlogBySlug };

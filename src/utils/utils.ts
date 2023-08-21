import fs from "fs";

const getAllBlogs = async () => {
    const dir = `${process.cwd()}/src/blogs`
    try {
        const blogs = fs.readdirSync(dir, "utf-8");
        console.log('files', blogs)
        return blogs;
    } catch (err) {
        console.error(err);
    }
};

const getBlogBySlug = (slug: string) => {
    const fileUrl = `${process.cwd()}/src/blogs/${slug}`
    try {
        const blog = fs.readFileSync(fileUrl, 'utf-8')
        return blog
    } catch (err) {
        console.error(err)
        return Error("failed to get blog");
    }
};

export { getAllBlogs, getBlogBySlug };

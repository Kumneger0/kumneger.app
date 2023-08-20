import fs from "fs";
import path from "path";

const BlogDir = path.join(__dirname, "../../../../src/blogs");

const getFilePath = (slug: string) => path.join(__dirname, `../../../../../src/blogs/${slug}`)

const getAllBlogs = async () => {
    console.log(BlogDir)
    const filterUneccessary = BlogDir.split('/').filter(path => path.trim() !== '.next').join('/')
    try {
        const blogs = fs.readdirSync(filterUneccessary, "utf-8");
        console.log('files', blogs)
        return blogs;
    } catch (err) {
        console.error(err);
    }
};

const getBlogBySlug = (slug: string) => {
    const fileUrl = `/home/kumneger/projects/portifolio-website/src/blogs/${slug}`
    console.log('blogdijljlr', fileUrl)
    try {
        const blog = fs.readFileSync(fileUrl, 'utf-8')
        console.log('testing', blog)
        return blog
    } catch (err) {
        console.error(err)
        return Error("failed to get blog");
    }
};

export { getAllBlogs, getBlogBySlug };

import fs from "node:fs";
import matter from 'gray-matter'

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
    console.log('slug', slug)
    try {
        return matter(fs.readFileSync(fileUrl, 'utf-8'))
    } catch (err) {
        console.error(err)
        return Error("failed to get blog");
    }
};


const getSampleRelatedArticles = async (articleToExclude?: string, limit?: number) => {
    const articles: Array<{
        title: string, content: string, data: {
            [key: string]: unknown;
        }
    }> = []
    const allBlogs = await getAllBlogs()
    if (!allBlogs?.length) return
    allBlogs.forEach(blog => {
        if ((limit && articles.length >= limit) || (articleToExclude && blog == articleToExclude)) return
        const fileUrl = `${process.cwd()}/src/blogs/${blog}`
        const { data, content } = matter(fs.readFileSync(fileUrl, 'utf-8'))
        if (content) {
            articles.push({ title: blog.split('.')[0], content, data })
        }
    })
    return articles
}

export { getAllBlogs, getBlogBySlug, getSampleRelatedArticles };

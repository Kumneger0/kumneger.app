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
    console.log('slug', slug)
    try {
        const blog = fs.readFileSync(fileUrl, 'utf-8')
        return blog
    } catch (err) {
        console.error(err)
        return Error("failed to get blog");
    }
};


const getSampleRelatedArticles = async (articleToExclude: string) => {
    const articles: Array<{ title: string, content: string }> = []
    const allBlogs = await getAllBlogs()
    if (!allBlogs?.length) return
    allBlogs.forEach(blog => {
        if (articles.length >= 3 || blog == articleToExclude) return
        const fileUrl = `${process.cwd()}/src/blogs/${blog}`
        const article = fs.readFileSync(fileUrl, 'utf-8')
        if (article) {
            articles.push({ title: blog.split('.')[0], content: article })
        }
    })
    return articles
}

export { getAllBlogs, getBlogBySlug, getSampleRelatedArticles };

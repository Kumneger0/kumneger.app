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

        const { data, content } = matter(fs.readFileSync(fileUrl, 'utf-8'))
        const [year, month, day] = data?.date?.split('/').map(Number)
        const date = new Date(year, month, day).toDateString()
        return { content, data: { ...data, date, author: 'Kumneger Wondimu' } }
    } catch (err) {
        console.error(err)
        return { data: null, content: null }
    }
};


const getSampleRelatedArticles = async (articleToExclude?: string, limit?: number) => {
    const articles: Array<{
        title: string, content: string, data: {
            title: string,
            author: string,
            date: string
            year: number,
            month: number,
            day: number
        }
    }> = []
    const allBlogs = await getAllBlogs()
    if (!allBlogs?.length) return
    allBlogs.forEach(blog => {
        if ((limit && articles.length >= limit) || (articleToExclude && blog == articleToExclude)) return
        const fileUrl = `${process.cwd()}/src/blogs/${blog}`
        const { data: config, content } = matter(fs.readFileSync(fileUrl, 'utf-8'))
        const data = config as typeof articles[number]['data']
        const [year, month, day] = data?.date?.split('/').map(Number)
        const date = new Date(year, month, day).toDateString()
        if (content) {
            articles.push({ title: blog.split('.')[0], content, data: { ...data, date, year, month, day } })
        }
    })
    return articles.sort((a, b) => a.data.year == b.data.year ?
        a.data.month == b.data.month ? b.data.day - a.data.day :
            b.data.month - a.data.month : b.data.year - a.data.year)
}

export { getAllBlogs, getBlogBySlug, getSampleRelatedArticles };

import fs from "node:fs";
import matter from 'gray-matter'
import cloudinary, { ResourceApiResponse, v2 } from 'cloudinary';



v2.config({
    cloud_name: 'dpthxgzfe',
    api_key: '476972241877952',
    api_secret: 'ZT9xZEq74CRLHRvEGKEExpISEOY',
    secure: true
})


interface resources extends ResourceApiResponse {
    public_id: string,
    secure_url: string
}

const getBlogContentInParallel = async (urls: string[]) => {
    const fetchContent = async (url: string) => {
        const rawMdx = await fetch(url).then(res => res.text())
        console.log(rawMdx)
        return rawMdx
    }
    const allText = await Promise.allSettled(urls.map(fetchContent))
    console.log(allText)
    const blogs = allText.map((result) => result.status == 'fulfilled' ? result.value : null)
    return blogs
}



async function getAllBlogsFromCloundnary() {
    try {
        const folder: { resources: resources[], } = await cloudinary.v2.api.search('folder:blogs/*')
        const blogs = folder.resources.filter(res => res.public_id.split('.')[1]?.toLowerCase().trim() == 'mdx')
        const blogSecureUrl = blogs.map((blog) => blog?.secure_url)
        return blogSecureUrl
    } catch {
        throw new Error('there was an error occured')
    }
}


async function getBlogFromCloundnary(publicId?: string) {
    let rawMdx: string | null = null
    const blog = await cloudinary.v2.api.resources_by_asset_ids(`43486229d0943419e1aff17e5bd6842f`)
    if (blog.resources.length) {
        rawMdx = await fetch(blog.resources[0].secure_url).then(res => res.text())
    }
    return rawMdx
}


const getAllBlogs = async () => {
    const dir = `${process.cwd()}/src/blogs`
    const urls = await getAllBlogsFromCloundnary()
    const blogs = await getBlogContentInParallel(urls)
    console.log(blogs.length)
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

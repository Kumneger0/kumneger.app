import fs from 'fs'
import path from 'path'

const getAllBlogs = async () => {
    const BlogDir = path.join(__dirname, '../../../../src/blogs')
    console.log(BlogDir)
    try {
        const blogs = fs.readdirSync(BlogDir, 'utf-8')
        return blogs
    } catch (err) {
        console.error(err)
    }

}


export { getAllBlogs }
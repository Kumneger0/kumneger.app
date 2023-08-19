'use client'
import React from 'react'
import Blog from '@/blogs/blog.mdx'
import { MDXProvider } from '@mdx-js/react'
import { Metadata } from 'next'
import { Heading, Paragraph, Code } from '../components/components';

const componenents = {
    h1: Heading,
    p: Paragraph,
    code: Code
}


function Home({ params }) {
    console.log(params)
    return (
        <div className='max-w-5xl mx-auto text-white'>
            <h1>{params?.slug}</h1>
            <MDXProvider components={componenents}>
                <Blog />
            </MDXProvider>
        </div>
    )
}

export default Home
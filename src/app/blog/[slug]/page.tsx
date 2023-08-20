import React from 'react'
import { SomeBlog } from './wrapper'
import { Metadata } from 'next'
import Blog from './wrapper'
import { getBlogBySlug } from '@/utils/utils'

type TPrams = { params: { slug: string } }


export async function generateMetadata({ params }: TPrams): Promise<Metadata> {
    await new Promise(res => setTimeout(res, 1000))
    return {
        title: params.slug.split('.')[0],
        description: params?.slug
    }
}


function Home({ params }: TPrams) {
    const TestBlog = getBlogBySlug(`${params.slug}`)
    return (
        <div className='w-screen bg-slate-300 text-black'>
            <div className='max-w-5xl mx-auto'>
                <h1 className='font-bold text-3xl'>{params.slug.split('.')[0]}</h1>
                <Blog slug={TestBlog}>
                    <SomeBlog />
                </Blog>
            </div>
        </div>
    )
}

export default Home
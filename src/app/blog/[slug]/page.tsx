import React from 'react'
import { SomeBlog } from './wrapper'
import { Metadata } from 'next'
import Blog from './wrapper'
import { getBlogBySlug } from '@/utils/utils'

type TPrams = { params: { slug: string } }

export async function generateMetadata({ params }: TPrams): Promise<Metadata> {
  await new Promise((res) => setTimeout(res, 1000));
  return {
    title: params.slug.split(".")[0],
    description: params?.slug,
  };
}

function Home({ params }: TPrams) {
  const TestBlog = getBlogBySlug(`${params.slug}`);
  console.log("test bllog", TestBlog);
  return (
    <div className="w-screen h-[200vh] bg-slate-100 text-black">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-bold text-3xl">{params.slug.split(".")[0]}</h1>
        <Blog>
          {!(TestBlog instanceof Error) ? TestBlog : "error occured sorry"}
        </Blog>
      </div>
    </div>
  );
}

export default Home
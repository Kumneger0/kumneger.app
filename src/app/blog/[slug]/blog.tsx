'use client'
import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import type { MDXComponents } from 'mdx/types.js'
import { Heading, Paragraph, Code } from '../components/components';

const componenents = {
    h1: Heading as MDXComponents['h1'],
    p: Paragraph as MDXComponents['p'],
    code: Code as MDXComponents['code']
} as MDXComponents


function Blog({ children }: { children: React.ReactNode }) {
    return (
        <div className='max-w-5xl mx-auto'>
            <MDXProvider components={componenents}>
                {children}
            </MDXProvider>
        </div>
    )
}

export default Blog
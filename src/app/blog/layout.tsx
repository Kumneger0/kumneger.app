import React from 'react'
import BlogHeader from './blogHeader'
import { Metadata } from 'next';
import Footer from '@/components/footer/footer';

export const metadata: Metadata = {
    title: "Blog | Kumneger Wondimu",
    description: "Blog About Programming",
};




function layout({ children }: { children: React.ReactNode }) {
    return (
        <html>

            <body>
                <BlogHeader />
                {children}
            </body>
            <Footer />
        </html>
    )
}

export default layout
import React from 'react'
import BlogHeader from './blogHeader'
import { Metadata } from 'next';
import Footer from '@/components/footer/footer';


export const metadata: Metadata = {
  title: "Blog | Kumneger Wondimu",
  description: "Blog About Programming",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="text-white bg-white">{children}</body>
    </html>
  );
}

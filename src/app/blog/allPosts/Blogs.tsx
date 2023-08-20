'use client'
import React from 'react'
import Link from 'next/link'

function Blogs({ blogs }: { blogs?: Array<string> }) {
    return (
        <div>
            <div className="w-full text-center items-center text-white grid grid-cols-3 gap-3 place-items-center">
                {blogs?.map((blog, i) => {
                    return <Link key={i} href={`/blog/${blog}`}>
                        <div className="w-80 min-h-[300px] p-3 rounded-md border border-black  m-2" key={i}>
                            <div>
                                {blog.split('.')[0]}
                            </div>
                        </div>
                    </Link>
                })}
            </div>
        </div>
    )
}

export default Blogs
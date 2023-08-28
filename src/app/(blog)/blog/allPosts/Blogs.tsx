"use client";
import React from "react";
import Link from "next/link";
import image from "../../../../../public/R.jpg";
import Image from "next/image";

function Blogs({ blogs }: { blogs?: Array<string> }) {
  return (
    <div>
      <div className="w-4/5 mx-auto my-5">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi, culpa
        nulla? Repellat soluta quaerat quos, ut laudantium eum magnam sunt.
        Impedit ex doloremque veritatis voluptatum quo sunt sequi, molestiae
        molestias repudiandae harum iste, quisquam et pariatur ipsa, velit
        dolorem officia.
      </div>
      <div className="w-11/12 flex justify-center flex-wrap gap-6">
        {blogs?.map((blog, i) => {
          return (
            <Link key={i} href={`/blog/${blog.split(".")[0]}`}>
              <div
                className="w-80 min-h-[300px] p-3 rounded-md border border-black  m-2"
                key={i}>
                <div>
                  <Image src={image} alt={blog.split(".")[0]} />
                  <div className="font-bold text-xl">
                    <div>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Exercitationem, dolorum!
                    </div>
                    <div className="text-[0.8em] font-thin flex gap-10 justify-center">
                      <span> {Math.floor(Math.random() * 10)} min read</span>
                      <span>category : frontend</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Blogs;

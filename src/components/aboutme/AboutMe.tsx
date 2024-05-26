import { ArrowRight } from "lucide-react";
import Avatar from "../../../public/1711802150838.png";
import Image from "next/image";
import Link from "next/link";

function AboutMe() {
  return (
    <section className="py-5">
      <div className="max-w-5xl -mt-10 mx-auto">
        <h1 className="md:text-3xl -ml-1  sm:-ml-3 my-4 text-2xl font-bold">
          Kumneger Wondimu (a.k.a Kune)
        </h1>
        <div className="space-y-2 text-lg w-11/12">
          <p className="text-gray-300">
    
            Hey there 👋 I'm an Ethiopian developer, well-versed in TypeScript, React, and Node.js, and equipped with a wide array of other technical skills
            <br />
            Currently, I'm a Computer Science student at Jimma University,
            preparing to graduate this year
          </p>
          <p className="text-gray-300">
            Occasionally, I share my insights and knowledge through a blog post,
            which you can find <Link href="/blog" className="text-blue-400">here</Link>. In these posts, I aim
            to share what I've learned and the knowledge I've gained
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;

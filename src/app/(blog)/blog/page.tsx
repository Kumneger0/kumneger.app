import { getSampleRelatedArticles } from "@/utils/utils";
import Link from "next/link";
import Blogs from "../../../components/blogs/Blogs";

export const dynamic = "force-static";

export default async function Home() {
  const blogs = await getSampleRelatedArticles();

  return (
    <div className="dark min-h-screen bg-gray-800 text-white flex flex-col">
      <main className=" mx-auto px-4 mt-12 md:px-6 lg:px-8 flex-1 overflow-y-auto">
        <section className="">
          <ul className="flex flex-col items-center">
            <Blogs className="justify-center" blogs={blogs} />
          </ul>
        </section>
        <section className="mt-12">
          <h2 className="text-3xl font-bold text-center">Contact</h2>
          <div className="mt-4 text-center">
            <p className="text-lg text-gray-300">
              If you want to get in touch with me, feel free to send me an email
              at
              <a className="underline text-blue-400" href="#">
                your-email@example.com
              </a>
            </p>
          </div>
        </section>
        <section className="mt-12">
          <h2 className="text-3xl font-bold text-center">Social Media</h2>
          <div className="flex space-x-4 mt-4 justify-center">
            <Link href="#">
              <img alt="Twitter" className="w-6 h-6" src="/placeholder.svg" />
            </Link>
            <Link href="#">
              <img alt="LinkedIn" className="w-6 h-6" src="/placeholder.svg" />
            </Link>
            <Link href="#">
              <img alt="GitHub" className="w-6 h-6" src="/placeholder.svg" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

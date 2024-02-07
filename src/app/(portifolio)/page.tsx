import React from "react";
import AboutMe from "@/components/aboutme/AboutMe";
import Projects from "@/components/previosProjects/previosProjects";
import ContactMe from "@/components/contactme/contactme";
import Work from "@/components/works/Work";
import Stacks from "@/components/stacks/Stacks";
import Services from "@/components/services/Services";

import {
  CardContent,
  Card,
  CardTitle,
  CardDescription,
  CardHeader
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PublishedArticles from "@/components/publishedArticles/PublishedArticles";
import Footer from "@/components/footer/footer";

export default function Home() {
  return (
    <>
      <AboutMe />
      <Work />
      <PublishedArticles />
      <Projects />
    </>
  );
}

export function Component5() {
  return (
    <div className="dark min-h-screen bg-gray-800 text-white">
      <main className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <section className="grid gap-8 md:grid-cols-2">
          <div className="flex items-center justify-center">
            <img
              alt="Your Name"
              className="aspect-square rounded-full object-cover"
              height="200"
              src="https://pics.craiyon.com/2023-10-03/c64134a721434b048ae228cc6a16643e.webp"
              width="200"
            />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Your Name</h1>
            <p className="text-lg text-gray-300">
              👨‍💻 A passionate Full Stack Developer based in Ethiopia 🇪🇹 with
              experience in building applications with JavaScript / React /
              Node.js and some other cool libraries and frameworks. I write
              about web development on my blog 🌐💡💻
            </p>
            <h2 className="text-2xl font-semibold">Tools I use:</h2>
            <ul className="list-disc list-inside text-gray-300">
              <li>JavaScript (ES6+)</li>
              <li>React</li>
              <li>Node.js</li>
              <li>GraphQL</li>
              <li>TypeScript</li>
            </ul>
          </div>
        </section>
        <section className="mt-12">
          <h2 className="text-3xl font-bold">Employment History</h2>
          <ul className="list-inside list-none mt-4 text-lg text-gray-300 space-y-4">
            <li>
              <h3 className="text-2xl font-semibold">
                {" "}
                Dynamo Center For Technology
              </h3>
              <p>Role: Full Stack Developer</p>
              <p>Duration: May 2023 - Present</p>
              <p>
                Description: Worked on several web applications using React,
                Node.js, Express, and MongoDB.{" "}
              </p>
            </li>
          </ul>
        </section>
        <section className="mt-12">
          <h2 className="text-3xl font-bold">Published Articles</h2>
          <ul className="list-inside list-disc mt-4 text-lg text-gray-300 space-y-4">
            <li>
              <Link className="underline text-blue-400" href="#">
                Understanding React Hooks
              </Link>
              <p>
                A deep dive into understanding React Hooks and how to use them
                in your applications.
              </p>
            </li>
            <li>
              <Link className="underline text-blue-400" href="#">
                Demystifying GraphQL
              </Link>
              <p>
                A comprehensive guide to understanding and implementing GraphQL
                in your applications.
              </p>
            </li>
            <li>
              <Link className="underline text-blue-400" href="#">
                Mastering TypeScript
              </Link>
              <p>
                Learn how to supercharge your JavaScript development with
                TypeScript.
              </p>
            </li>
          </ul>
        </section>
        <section className="mt-12">
          <h2 className="text-3xl font-bold">Sample Projects</h2>
          <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Project 1</CardTitle>
                <CardDescription>
                  A brief description of Project 1.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link className="underline text-blue-400" href="#">
                  View Project
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Project 2</CardTitle>
                <CardDescription>
                  A brief description of Project 2.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link className="underline text-blue-400" href="#">
                  View Project
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Project 3</CardTitle>
                <CardDescription>
                  A brief description of Project 3.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link className="underline text-blue-400" href="#">
                  View Project
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>
        <section className="mt-12">
          <h2 className="text-3xl font-bold">Contact</h2>
          <div className="mt-4">
            <p className="text-lg text-gray-300">
              If you want to get in touch with me, feel free to send me an email
              at:
              <a className="underline text-blue-400" href="#">
                Kumngerwondimu@gmail.com
              </a>
              .
            </p>
          </div>
        </section>
        <section className="mt-12">
          <h2 className="text-3xl font-bold">Social Media</h2>
          <div className="flex space-x-4 mt-4">
            <Link className="text-blue-400 underline" href="#">
              Twitter
            </Link>
            <Link className="text-blue-400 underline" href="#">
              LinkedIn
            </Link>
            <Link className="text-blue-400 underline" href="#">
              GitHub
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

// export default function Component2() {
//   return (
//     <div className="dark min-h-screen bg-gray-800 text-white flex items-center justify-center">
//       <main className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
//         <section className="mt-12">
//           <h1 className="text-4xl font-bold text-center ">Kumnger's Blog</h1>
//           <ul className="flex flex-col items-center">
//             <li className="py-4 w-full md:w-2/3">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Understanding React Hooks</CardTitle>
//                   <CardDescription>
//                     A deep dive into understanding React Hooks and how to use them in your applications.
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <Link className="underline text-blue-400" href="#">
//                     Read More
//                   </Link>
//                 </CardContent>
//               </Card>
//             </li>
//             <li className="py-4 w-full md:w-2/3">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Demystifying GraphQL</CardTitle>
//                   <CardDescription>
//                     A comprehensive guide to understanding and implementing GraphQL in your applications.
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <Link className="underline text-blue-400" href="#">
//                     Read More
//                   </Link>
//                 </CardContent>
//               </Card>
//             </li>
//             <li className="py-4 w-full md:w-2/3">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Mastering TypeScript</CardTitle>
//                   <CardDescription>
//                     Learn how to supercharge your JavaScript development with TypeScript.
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <Link className="underline text-blue-400" href="#">
//                     Read More
//                   </Link>
//                 </CardContent>
//               </Card>
//             </li>
//           </ul>
//           <div className="mt-6 flex justify-center">
//             <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Load More</Button>
//           </div>
//         </section>
//         <section className="mt-12">
//           <h2 className="text-3xl font-bold text-center">Contact</h2>
//           <div className="mt-4 text-center">
//             <p className="text-lg text-gray-300">
//               If you want to get in touch with me, feel free to send me an email at
//               <a className="underline text-blue-400" href="#">
//                 your-email@example.com
//               </a>
//               .
//             </p>
//           </div>
//         </section>
//         <section className="mt-12">
//           <h2 className="text-3xl font-bold text-center">Social Media</h2>
//           <div className="flex space-x-4 mt-4 justify-center">
//             <Link href="#">
//               <img alt="Twitter" className="w-6 h-6" src="/placeholder.svg" />
//             </Link>
//             <Link href="#">
//               <img alt="LinkedIn" className="w-6 h-6" src="/placeholder.svg" />
//             </Link>
//             <Link href="#">
//               <img alt="GitHub" className="w-6 h-6" src="/placeholder.svg" />
//             </Link>
//           </div>
//         </section>
//       </main>
//     </div>
//   )
// }

// export default function Component3() {
//   return (
//     <div className="dark min-h-screen bg-gray-800 text-white flex items-center justify-center">
//       <main className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
//         <section className="mt-12">
//           <div className="mt-6 flex justify-center">
//             <Link className="underline text-blue-400" href="#">
//               Back to Blog
//             </Link>
//           </div>
//           <h1 className="text-4xl font-bold text-center mt-6">Understanding React Hooks</h1>
//           <div className="flex justify-center mt-4">
//             <img
//               alt="Blog banner"
//               className="w-full h-64 object-cover"
//               height="200"
//               src="https://kumneger.vercel.app/api/gen-og-images/Accessing%20User's%20Screen%20in%20JavaScript"
//               style={{
//                 aspectRatio: "1000/200",
//                 objectFit: "cover",
//               }}
//               width="1000"
//             />
//           </div>
//           <Card>
//             <CardHeader>
//               <CardTitle>Understanding React Hooks</CardTitle>
//               <div className="flex justify-between items-center">
//                 <CardDescription>
//                   A deep dive into understanding React Hooks and how to use them in your applications.
//                 </CardDescription>
//                 <div className="text-gray-400">
//                   <p>
//                     Published on: <span className="font-bold">Feb 6, 2024</span>
//                   </p>
//                   <p>
//                     Author: <span className="font-bold">John Doe</span>
//                   </p>
//                 </div>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <p className="text-lg text-gray-300">Lorem ipsum</p>
//               <p className="text-lg text-gray-300 mt-4">
//                 Hooks are functions that let you “hook into” React state and lifecycle features from function
//                 components. Hooks don’t work inside classes — they let you use React without classes.
//               </p>
//               <p className="text-lg text-gray-300 mt-4">
//                 React provides a few built-in Hooks like useState. You can also create your own Hooks to reuse stateful
//                 behavior between different components.
//               </p>
//             </CardContent>
//           </Card>
//         </section>
//         <section className="mt-12">
//           <h2 className="text-3xl font-bold text-center">Comments</h2>
//           <Card className="w-full border-none">
//             <CardHeader>
//               <CardTitle>John Doe</CardTitle>
//               <CardDescription>Great article! Really helped me understand React Hooks.</CardDescription>
//             </CardHeader>
//             <CardContent className="w-full">
//               <div className="flex justify-between items-center">
//                 <div className="flex space-x-2">
//                   <Button>Upvote</Button>
//                   <Button>Downvote</Button>
//                   <Button>Delete</Button>
//                   <Button>Reply</Button>
//                 </div>
//               </div>
//               <Card className="ml-0 border-none md:ml-0 lg:ml-0 w-full">
//                 <CardHeader>
//                   <CardTitle>Jane Doe</CardTitle>
//                   <CardDescription>I agree, this was very helpful!</CardDescription>
//                 </CardHeader>
//                 <CardContent className="w-full border-none">
//                   <div className="flex justify-between items-center">
//                     <div className="flex space-x-2">
//                       <Button>Upvote</Button>
//                       <Button>Downvote</Button>
//                       <Button>Delete</Button>
//                       <Button>Reply</Button>
//                     </div>
//                   </div>
//                   <Card className="ml-0 md:ml-0 lg:ml-0 w-full border-none">
//                     <CardHeader>
//                       <CardTitle>John Smith</CardTitle>
//                       <CardDescription>Thanks for the insights!</CardDescription>
//                     </CardHeader>
//                     <CardContent className="w-full">
//                       <div className="flex justify-between items-center">
//                         <div className="flex space-x-2">
//                           <Button>Upvote</Button>
//                           <Button>Downvote</Button>
//                           <Button>Delete</Button>
//                           <Button>Reply</Button>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </CardContent>
//               </Card>
//             </CardContent>
//           </Card>
//           <section className="mt-12">
//             <h2 className="text-3xl font-bold text-center">Add a Comment</h2>
//             <Card>
//               <CardContent>
//                 <form className="space-y-4">
//                   <input className="w-full p-2 border border-gray-300 rounded" placeholder="Your Name" type="text" />
//                   <textarea className="w-full p-2 border border-gray-300 rounded" placeholder="Your Comment" rows={4} />
//                   <Button type="submit">Post Comment</Button>
//                 </form>
//               </CardContent>
//             </Card>
//           </section>
//         </section>
//         <section className="mt-12">
//           <h2 className="text-3xl font-bold text-center">Related Articles</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Exploring useState</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-lg text-gray-300">An in-depth look at the useState React Hook.</p>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader>
//                 <CardTitle>Understanding useEffect</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-lg text-gray-300">A deep dive into the useEffect React Hook.</p>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader>
//                 <CardTitle>Custom Hooks in React</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-lg text-gray-300">How to create and use custom Hooks in React.</p>
//               </CardContent>
//             </Card>
//           </div>
//         </section>
//         <section className="mt-12">
//           <h2 className="text-3xl font-bold text-center">Contact</h2>
//           <div className="mt-4 text-center">
//             <p className="text-lg text-gray-300">
//               If you want to get in touch with me, feel free to send me an email at
//               <a className="underline text-blue-400" href="#">
//                 your-email@example.com
//               </a>
//               .
//             </p>
//           </div>
//         </section>
//         <section className="mt-12">
//           <h2 className="text-3xl font-bold text-center">Social Media</h2>
//           <div className="flex space-x-4 mt-4 justify-center">
//             <Link href="#">
//               <img alt="Twitter" className="w-6 h-6" src="/placeholder.svg" />
//             </Link>
//             <Link href="#">
//               <img alt="LinkedIn" className="w-6 h-6" src="/placeholder.svg" />
//             </Link>
//             <Link href="#">
//               <img alt="GitHub" className="w-6 h-6" src="/placeholder.svg" />
//             </Link>
//           </div>
//         </section>
//       </main>
//     </div>
//   )
// }

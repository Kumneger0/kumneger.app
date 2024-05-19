"use client";






import DrawerComponent, { Project } from "../drawer";

import reactPocketChatApp from "../../../public/chatapp.png";

import Kdrive from "../../../public/krive.png";

import NextRecipe from "../../../public/recipe.png";

import NextRecipe2 from "../../../public/Screenshot from 2024-02-11 17-20-45.png";

import NextRecipe3 from "../../../public/Screenshot from 2024-02-11 17-22-19.png";

import nextjsIcon from "../../../public/nextjs-icon-svgrepo-com.svg";

import postgres from "../../../public/postgresql-svgrepo-com.svg";

import mdx from "../../../public/mdx-svgrepo-com.svg";

import prisma from "../../../public/prisma-svgrepo-com.svg";

import reactIcon from "../../../public/react-svgrepo-com.svg";

import firebase from "../../../public/firebase-svgrepo-com.svg";

import bunIcon from "../../../public/bun.webp";

import pocketBaseIcon from "../../../public/pocketbase_logo_icon_248816.png";

import esbuild from "../../../public/esbuild-svgrepo-com.svg";

import plasmoSVG from "../../../public/seo-1200x700.png";

import goIcon from "../../../public/1200px-Go_Logo_Blue.svg.png";

import Image from "next/image";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "../ui/card";
import { Eye } from "lucide-react";
import Link from "next/link";
import { Github, LinkIcon } from "lucide-react";

const sampleProjects: Partial<Project & Record<string, any>>[] = [
  {
    projectTitle: "ReactBunode",
    description:
      "Highly Experimental React Library. Converts React components to static HTML for enhanced performance and SEO, with support for React Server Components. Optimizes for speed, SEO, and scalability.",
    projectGithubRepo: "https://github.com/Kumneger0/reactBunode",
    projectLiveUrl: "https://reactbunode.pages.dev/",
    usedTechStackInProject: [
      { name: "Bun", url: "https://bun.sh", icon: bunIcon },
      { name: "React", url: "https://react.dev", icon: reactIcon },
      { name: "Esbuild", url: "https://esbuild.github.io", icon: esbuild }
    ]
  },
  {
    projectTitle: "My Blog",
    description:
      "This blog app, crafted with Next.js, serves as a platform for sharing insights and articles on web development. Occasionally, I pen my thoughts and tutorials, making it a space where I explore and document my journey in the dynamic world of web development.",
    projectGithubRepo: "https://github.com/Kumneger0/portifolio-website",
    projectLiveUrl: "/blog",
    usedTechStackInProject: [
      { name: "NextJS", url: "https://nextjs.org", icon: nextjsIcon },
      { name: "Postgresql", url: "https://Postgresql.org", icon: postgres },
      { name: "Prisma", url: "https://prisma.io", icon: prisma },
      { name: "mdx", url: "https://mdxjs.com/", icon: mdx }
    ]
  },
  {

    projectTitle: "Kpass",

    description:

      "KPass is an experimental, self-hosted password manager developed with Go and TypeScript",

    projectGithubRepo: "https://github.com/Kumneger0/kpass",

    projectLiveUrl: "#",

    usedTechStackInProject: [

      { name: "Plasmo", url: "https://www.plasmo.com/", icon: plasmoSVG },

      { name: "Postgresql", url: "https://Postgresql.org", icon: postgres },

      { name: "go", url: "https://go.dev", icon: goIcon }

    ]

  },
  {
    projectTitle: `React-PocketChat`,
    description:
      "Explore a new real-time chat app built with React, TypeScript, and Pocketbase. Connect with friends via usernames, have private chats, and view profiles. Experience smooth, interactive communication now!",
    images: [reactPocketChatApp],
    projectGithubRepo:
      "https://github.com/Kumneger0/chat-app-with-react-and-pocketbase",
    projectLiveUrl: "https://react-pocketchat.web.app/ ",
    usedTechStackInProject: [
      {
        name: "pocketbase",
        url: "https://pocketbase.io",
        icon: pocketBaseIcon
      },
      { name: "React", url: "https://react.dev", icon: reactIcon }
    ]
  },
  {
    images: [Kdrive],
    projectGithubRepo: "https://github.com/Kumneger0/KDrive",
    projectLiveUrl: "https://kunedrive.web.app/",
    usedTechStackInProject: [
      { name: "firebase", url: "https://firebase.google.com", icon: firebase },
      { name: "React", url: "https://react.dev", icon: reactIcon }
    ],
    projectTitle: `KDrive - Your Personal Cloud`,
    description:
      "Developed KDrive, a cloud storage solution using React and Firebase, purely for personal enjoyment Emphasizes my skills in leveraging Firebase for cloud storage."
  },
  {
    projectGithubRepo: "https://github.com/Kumneger0/recipe-app-nextjs",
    images: [NextRecipe, NextRecipe2, NextRecipe3],
    projectLiveUrl: "https://food-app-lac.vercel.app/",
    usedTechStackInProject: [
      { name: "nextJS", url: "https://nextjs.org", icon: nextjsIcon }
    ],
    projectTitle: "Tasty - Your Culinary Adventure Starts Here",
    description:
      "Experience Tasty, a recipe app powered by Next.js and TypeScript, featuring a wide range of meals with videos and step-by-step instructions. Start cooking with Tasty today!"
  }
];

function Projects() {
  return (
    <section className="mt-12 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold">Sample Projects</h2>
      <div className="grid gap-4 mt-4 md:grid-cols-1 lg:grid-cols-2">
        {sampleProjects.map(({ description, projectTitle, ...project }) => (
          <Card
            className="border-none bg-gray-700 relative rounded-xl"
            key={projectTitle}
          >
            <CardHeader>
              <CardTitle className="text-xl">{projectTitle}</CardTitle>
              <CardDescription className="text-base mt-4">
                {description}
                <div>
                  <div className="w-full text-center py-2 font-bold text-2xl">
                    Made With
                  </div>
                  <div className="my-3 w-full flex justify-around gap-1">
                    {project.usedTechStackInProject?.map(
                      ({ name, url, icon }) => (
                        <div>
                          <TooltipWrapper tooltipContent={name}>
                            <Link target="_blank" href={url}>
                              <Image
                                className="w-12 h-12 object-contain object-center"
                                src={icon as string}
                                alt={name}
                              />
                            </Link>
                          </TooltipWrapper>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="relative flex gap-5 justify-start items-center bottom-0 right-0">
              <>
                {project.images?.length && (
                  <>
                    <DrawerComponent
                      project={{ description, projectTitle, ...project }}
                    >
                      <TooltipWrapper tooltipContent="project images">
                        <Eye />
                      </TooltipWrapper>
                    </DrawerComponent>
                  </>
                )}
                <div>
                  <Link
                    href={project.projectGithubRepo as string}
                    target="_blank"
                  >
                    <TooltipWrapper tooltipContent="github repo">
                      <Github />
                    </TooltipWrapper>
                  </Link>
                </div>
                <div>
                  <Link target="_blank" href={project.projectLiveUrl as string}>
                    <TooltipWrapper tooltipContent="live url">
                      <LinkIcon />
                    </TooltipWrapper>
                  </Link>
                </div>
              </>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default Projects;

function TooltipWrapper({
  children,
  tooltipContent
}: {
  children: React.ReactNode;
  tooltipContent: string;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent className="bg-white text-black">
          <p>{tooltipContent.toLowerCase()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

"use client";

import DrawerComponent, { Project } from "../drawer";
import reactPocketChatApp from "../../../public/chatapp.png";
import Kdrive from "../../../public/Kdrive.png";
import NextRecipe from "../../../public/recipe.png";
import NextRecipe2 from "../../../public/Screenshot from 2024-02-11 17-20-45.png";
import NextRecipe3 from "../../../public/Screenshot from 2024-02-11 17-22-19.png";

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
    projectLiveUrl: "https://reactbunode.pages.dev/"
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
      { name: "pocketbase", url: "https://pocketbase.io" },
      { name: "React", url: "https://react.dev" }
    ]
  },
  {
    images: [Kdrive],
    projectGithubRepo: "https://github.com/Kumneger0/KDrive",
    projectLiveUrl: "https://kunedrive.web.app/",
    usedTechStackInProject: [
      { name: "firebase", url: "https://firebase.google.com" },
      { name: "React", url: "https://react.dev" }
    ],
    projectTitle: `KDrive - Your Personal Cloud`,
    description:
      "Developed KDrive, a cloud storage solution using React and Firebase, purely for personal enjoyment Emphasizes my skills in leveraging Firebase for cloud storage."
  },
  {
    projectGithubRepo: "https://github.com/Kumneger0/recipe-app-nextjs.",
    images: [NextRecipe, NextRecipe2, NextRecipe3],
    projectLiveUrl: "",
    usedTechStackInProject: [{ name: "nextJS", url: "https://nextjs.org" }],
    projectTitle: "Tasty - Your Culinary Adventure Starts Here",
    description:
      "Experience Tasty, a recipe app powered by Next.js and TypeScript, featuring a wide range of meals with videos and step-by-step instructions. Start cooking with Tasty today!"
  }
];

function Projects() {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold">Sample Projects</h2>
      <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
        {sampleProjects.map(({ description, projectTitle, ...project }) => (
          <Card
            className="border-none bg-gray-700 relative rounded-xl"
            key={projectTitle}
          >
            <CardHeader>
              <CardTitle className="text-xl">{projectTitle}</CardTitle>
              <CardDescription className="text-base mt-4">
                {description}
              </CardDescription>
            </CardHeader>
            <CardContent className="relative flex gap-5 justify-start items-center bottom-0 right-0">
              {project.images?.length ? (
                <>
                  <DrawerComponent
                    project={{ description, projectTitle, ...project }}
                  >
                    <Eye />
                  </DrawerComponent>
                  <div>
                    <Link
                      href={project.projectGithubRepo as string}
                      target="_blank"
                    >
                      <Github />
                    </Link>
                  </div>
                </>
              ) : (
                <Link
                  href={project.projectGithubRepo as string}
                  target="_blank"
                >
                  <Github />
                </Link>
              )}
              <div>
                <Link target="_blank" href={project.projectLiveUrl as string}>
                  <LinkIcon />
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default Projects;

"use client";

import DrawerComponent, { Project } from "../drawer";
import reactPocketChatApp from "../../../public/chatapp.png";
import Kdrive from "../../../public/Kdrive.png";
import NextRecipe from "../../../public/recipe.png";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "../ui/card";

const sampleProjects: Project[] = [
  {
    projectTitle: `React-PocketChat`,
    description:
      "Explore a new real-time chat app built with React, TypeScript, and Pocketbase. Connect with friends via usernames, have private chats, and view profiles. Experience smooth, interactive communication now!",
    images: [reactPocketChatApp],
    projectGithubRepo: "",
    projectLiveUrl: " ",
    usedTechStackInProject: ["pocketbase", "React"]
  },
  {
    images: [Kdrive],
    projectGithubRepo: "",
    projectLiveUrl: "",
    usedTechStackInProject: ["firebase", "React"],
    projectTitle: `KDrive - Your Personal Cloud`,
    description:
      "Developed KDrive, a cloud storage solution using React and Firebase, purely for personal enjoyment Emphasizes my skills in leveraging Firebase for cloud storage."
  },
  {
    projectGithubRepo: "",
    images: [NextRecipe],
    projectLiveUrl: "",
    usedTechStackInProject: ["nextJS"],
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
            className="border-none bg-gray-700 rounded-lg"
            key={projectTitle}
          >
            <CardHeader>
              <CardTitle className="text-xl">{projectTitle}</CardTitle>
              <CardDescription className="text-base mt-4">
                {description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DrawerComponent
                project={{ description, projectTitle, ...project }}
              >
                Details
              </DrawerComponent>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default Projects;

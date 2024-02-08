"use client";
import Link from "next/link";
import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "../ui/card";

const sampleProjects = [
  {
    title: `React-PocketChat`,
    descreption:
      "Explore a new real-time chat app built with React, TypeScript, and Pocketbase. Connect with friends via usernames, have private chats, and view profiles. Experience smooth, interactive communication now!"
  },
  {
    title: `KDrive - Your Personal Cloud`,
    descreption:
      "Developed KDrive, a cloud storage solution using React and Firebase, purely for personal enjoyment Emphasizes my skills in leveraging Firebase for cloud storage."
  },
  {
    title: `Tasty - Your Culinary Adventure Starts Here`,
    descreption:
      "Experience Tasty, a recipe app powered by Next.js and TypeScript, featuring a wide range of meals with videos and step-by-step instructions. Start cooking with Tasty today!"
  }
];

function Projects() {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold">Sample Projects</h2>
      <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
        {sampleProjects.map(({ descreption, title }) => (
          <Card className="border-none bg-gray-700 rounded-lg" key={title}>
            <CardHeader>
              <CardTitle className="text-xl">{title}</CardTitle>
              <CardDescription className="text-base mt-4">
                {descreption}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link className="underline text-blue-400" href="#">
                View Project
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default Projects;

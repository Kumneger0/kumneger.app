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

function Projects() {
  return (
    <section className="mt-12">
      <h2 className="text-3xl font-bold">Sample Projects</h2>
      <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }, (_arr, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>Project {i + 1}</CardTitle>
              <CardDescription>
                A brief description of Project {i + 1}.
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

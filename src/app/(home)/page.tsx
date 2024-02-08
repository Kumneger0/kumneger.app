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
      <Footer />
    </>
  );
}

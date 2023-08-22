import React from "react";
import AboutMe from "@/components/aboutme/AboutMe";
import Projects from "@/components/previosProjects/previosProjects";
import ContactMe from "@/components/contactme/contactme";
import Work from "@/components/works/Work";
import Stacks from "@/components/stacks/Stacks";
import Services from "@/components/services/Services";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AboutMe />
      <Services />
      <Projects />
      <Stacks />
      <Work />
      <ContactMe />
    </main>
  );
}

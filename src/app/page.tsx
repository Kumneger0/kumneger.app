"use client";
import AboutMe from "@/components/AboutMe";
import PreviosProjecs from "@/components/previosProjects";
import ContactMe from "@/components/contactme";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AboutMe />
      <PreviosProjecs />
      <ContactMe />
    </main>
  );
}

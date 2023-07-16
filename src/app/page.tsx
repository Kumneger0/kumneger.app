"use client";
import AboutMe from "@/components/AboutMe";
import PreviosProjecs from "@/components/previosProjects";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AboutMe />
      <PreviosProjecs />
    </main>
  );
}

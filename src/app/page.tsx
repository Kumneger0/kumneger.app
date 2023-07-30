import AboutMe from "@/components/AboutMe";
import Projects from "@/components/previosProjects";
import ContactMe from "@/components/contactme";
import Work from "@/components/Work";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AboutMe />
      <Projects />
      <Work />
      <ContactMe />
    </main>
  );
}

import AboutMe from "@/components/aboutme/AboutMe";
import Projects from "@/components/previosProjects/previosProjects";
import Work from "@/components/works/Work";

import PublishedArticles from "@/components/publishedArticles/PublishedArticles";

export default function Home() {
  return (
    <>
      <AboutMe />
      <Work />
      <PublishedArticles />
      <Projects />
    </>
  );
}

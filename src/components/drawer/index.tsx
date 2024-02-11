import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import Image, { StaticImageData } from "next/image";
import { Button } from "../ui/button";

import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import Link from "next/link";

export function ImagesCarousel({ images }: { images: Array<StaticImageData> }) {
  return (
    <Carousel className="w-4/5 mx-auto">
      <CarouselContent className="w-full border border-black grid place-items-center">
        {images.map((src, i) => (
          <CarouselItem className="w-full" key={i}>
            <div className="p-1 w-full max-h-[500px] aspect-video object-center object-cover">
              <Image
                className="w-full aspect-auto"
                alt="project image"
                src={src}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export interface Project {
  projectTitle: string;
  images: Array<StaticImageData>;
  description: string;
  projectLiveUrl: string;
  projectGithubRepo: string;
  usedTechStackInProject: Array<string>;
}

export default function DrawerComponent({
  children,
  project
}: {
  children: React.ReactNode;
  project: Project;
}) {
  return (
    <div className="max-w-7xl mx-auto">
      <Drawer>
        <DrawerTrigger>{children}</DrawerTrigger>
        <DrawerContent className="max-h-[90vh] overflow-y-auto h-full bg-black grid place-items-center ">
          <DrawerHeader className="">
            <DrawerTitle className="w-full text-center">
              {project.projectTitle}
            </DrawerTitle>
            <div className="max-h-[600px]">
              <ImagesCarousel images={project.images} />
            </div>
            <DrawerDescription className="relative z-[999999]">
              {project.description}
            </DrawerDescription>
          </DrawerHeader>
          <div></div>
          <DrawerFooter className="flex relative z-[99999] justify-center items-center gap-3 w-full">
            <Link href={project.projectLiveUrl}>
              <Button>site</Button>
            </Link>
            <Link href={project.projectGithubRepo}>
              <Button>repo</Button>
            </Link>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

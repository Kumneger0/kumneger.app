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
      <CarouselContent className="">
        {images.map((src, i) => (
          <CarouselItem
            className="w-full relative z-50 border border-green-500"
            key={i}
          >
            <div className="p-1 w-full z-40 relative aspect-video object-center object-cover">
              <Image
                className="w-full aspect-video object-contain object-center"
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
  usedTechStackInProject: Array<{ name: string; url: string }>;
}

export default function DrawerComponent({
  children,
  project
}: {
  children: React.ReactNode;
  project: Project;
}) {
  return (
    <div className="max-w-5xl mx-auto">
      <Drawer>
        <DrawerTrigger className="">{children}</DrawerTrigger>
        <DrawerContent className="bg-gray-700 overflow-y-auto  grid place-items-center ">
          <DrawerHeader className="max-h-[400px]  z-[9999]">
            <DrawerTitle className="w-full text-center">
              {project.projectTitle}
            </DrawerTitle>
            <div className="">
              <ImagesCarousel images={project.images} />
            </div>
            <h2 className="relative z-50 font-bold text-xl w-full text-center">
              Descreption
            </h2>
            <DrawerDescription className="relative z-[999999] max-w-4xl mx-auto">
              {project.description}
            </DrawerDescription>
            <div className="relative my-4 z-50">
              <div className=" text-xl w-full text-center">built with</div>
              <ul className="flex flex-col py-2 w-full justify-center items-center">
                {project.usedTechStackInProject.map((tool, i) => {
                  return (
                    <li className="">
                      <Link
                        className="text-blue-600 hover:underline"
                        href={tool.url}
                      >
                        {tool.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </DrawerHeader>

          <DrawerFooter className="flex bg-black  relative z-[99999] justify-center items-center gap-3 w-full">
            <div className=" flex w-full justify-center">
              <div>
                {" "}
                <Link href={project.projectGithubRepo}>
                  <Button className="capitalize px-3 mx-2 hover:bg-black hover:text-white rounded-xl">
                    Repo
                  </Button>
                </Link>
              </div>
              <div>
                {" "}
                <Link href={project.projectLiveUrl}>
                  <Button
                    className="capitalize px-3 mx-auto rounded-xl hover:bg-green-600 "
                    variant={"default"}
                  >
                    site
                  </Button>
                </Link>
              </div>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

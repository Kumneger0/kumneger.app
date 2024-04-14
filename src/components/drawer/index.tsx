import Image, { StaticImageData } from "next/image";

import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

export function ImagesCarousel({ images }: { images: Array<StaticImageData> }) {
  return (
    <Carousel className="w-4/5 mx-auto">
      <CarouselContent className="">
        {images.map((src, i) => (
          <CarouselItem className="w-full relative z-50" key={i}>
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
  usedTechStackInProject: Array<{ name: string; url: string; icon?: string }>;
}

export default function ProjectDialog({
  children,
  project
}: {
  children: React.ReactNode;
  project: Partial<Project>;
}) {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="border-none max-[500px]:max-w-[400px]  max-w-lg sm:max-w-xl xl:max-w-5xl lg:max-w-4xl  bg-gray-900">
        <DialogHeader className="">
          <DialogTitle className="w-full text-center py-2 px-4">
            {project.projectTitle}
          </DialogTitle>
          <DialogDescription>
            {project.images?.length ? (
              <ImagesCarousel images={project.images} />
            ) : (
              <div>nuull</div>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

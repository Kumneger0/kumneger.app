import { z } from "zod";

export const Route = {
  name: "ApiGenOgImagesSlug",
  params: z.object({
    slug: z.string(),
  })
};

export const GET = {
  result: z.object({}),
};

import { z } from "zod";

export const Route = {
  name: "BlogBlogSlugComments",
  params: z.object({
    slug: z.string(),
  })
};


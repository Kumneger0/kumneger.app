import { z } from "zod";

export const Route = {
  name: "BlogBlogSlug",
  params: z.object({
    slug: z.string(),
  })
};


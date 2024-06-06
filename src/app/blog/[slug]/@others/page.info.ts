import { z } from "zod";

export const Route = {
  name: "BlogBlogSlugOthers",
  params: z.object({
    slug: z.string(),
  })
};


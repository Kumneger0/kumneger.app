import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
        server: {
          DATABASE_URL: z.string().url(),
          POSTGRES_URL: z.string().url(),
          cloud_name: z.string(),
          api_key: z.string(),
          api_secret: z.string(),
          GITHUBCLIENTSECRET: z.string(),
          GITHUBCLIENTID: z.string(),
          GITHUBCLIENTID_PROD: z.string(),
          GITHUBCLIENTSECRET_PROD: z.string()
        },
        //@ts-ignore
        runtimeEnv: process.env
      })
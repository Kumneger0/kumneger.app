import NextAuth from "next-auth";
import Github from "next-auth/providers/github";

import * as z from "zod";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/utils/db";
import { env } from "@/server/env";

export const dynamic = "force-dynamic";

const providers = [
  Github({
    clientId:
      process.env.NODE_ENV == "development"
        ? env.GITHUBCLIENTID
        : env.GITHUBCLIENTID_PROD,
    clientSecret:
      process.env.NODE_ENV == "development"
        ? env.GITHUBCLIENTSECRET
        : env.GITHUBCLIENTSECRET_PROD
  })
];

const handler = NextAuth({
  // @ts-ignore
  adapter: PrismaAdapter(db),
  providers
});

export { handler as GET, handler as POST };

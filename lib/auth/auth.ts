import { PrismaClient } from "@/app/generated/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
const prisma = new PrismaClient();

export const auth = betterAuth({
  plugins: [nextCookies()],
  database: prismaAdapter(prisma, {
    provider: "sqlite",
  }),
  emailAndPassword: {
    enabled: true,
  },
});

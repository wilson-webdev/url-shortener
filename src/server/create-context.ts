import { prisma } from "@/server/utils/prisma";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";

export function createContext({ req, res }: CreateNextContextOptions) {
  return {
    res,
    req,
    prisma,
  };
}

export type Context = ReturnType<typeof createContext>;

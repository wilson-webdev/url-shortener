import { z } from "zod";
import { trpc } from "../trpc";
import { TRPCError } from "@trpc/server";
import { createShortUrl } from "../utils/create-short-url";

export const urlRouter = trpc.router({
  getUrl: trpc.procedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(async ({ ctx: { prisma }, input: { slug } }) => {
      const url = await prisma.url.findUnique({
        where: {
          shortUrl: slug,
        },
      });

      if (!url) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Could not find url with slug ${slug}`,
        });
      }

      return url;
    }),
  generateUrl: trpc.procedure
    .input(
      z.object({
        url: z.string().url(),
      })
    )
    .mutation(async ({ ctx: { prisma }, input: { url } }) => {
      const existingUrl = await prisma.url.findUnique({
        where: {
          originalUrl: url,
        },
      });

      if (existingUrl) {
        return existingUrl;
      }

      const shortUrl = await prisma.url.create({
        data: {
          originalUrl: url,
          shortUrl: createShortUrl(url),
        },
      });

      return shortUrl;
    }),
});

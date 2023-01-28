import { trpc } from "../trpc";
import { urlRouter } from "./url.router";

export const appRouter = trpc.router({
  url: urlRouter,
});

export type AppRouter = typeof appRouter;

import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter } from "../../../server/routers/app.router";
import { createContext } from "@/server/create-context";

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});

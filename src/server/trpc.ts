import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { createContext } from "./create-context";

export const trpc = initTRPC
  .context<typeof createContext>()
  .create({ transformer: superjson });

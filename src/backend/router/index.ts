import * as trpc from "@trpc/server";

import superjson from "superjson";
import { reportRouter } from "./report";

export const appRouter = trpc
  .router()
  .transformer(superjson)
  .merge("reports.", reportRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
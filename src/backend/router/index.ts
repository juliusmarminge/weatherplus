import * as trpc from "@trpc/server";

import superjson from "superjson";
import { reportRouter } from "./report";
import { measurementRouter } from "./measurement";

export const appRouter = trpc
  .router()
  .transformer(superjson)
  .merge("report.", reportRouter)
  .merge("measurement.", measurementRouter);

// export type definition of API
export type AppRouter = typeof appRouter;

import * as trpc from "@trpc/server";
import { z } from "zod";
import { prisma } from "~/backend/db/client";

export const measurementRouter = trpc
  .router()
  .query("get-by-id", {
    input: z.object({ id: z.number().int() }),
    async resolve({ input }) {
      return await prisma.measurement.findFirst({
        where: { id: input.id },
      });
    },
  })
  .query("get-all", {
    async resolve() {
      return await prisma.measurement.findMany();
    },
  })
  .mutation("create", {
    input: z.object({
      reportId: z.string(),
      type: z.string().min(2).max(16),
      value: z.number(),
    }),
    async resolve({ input }) {
      return await prisma.measurement.create({
        data: {
          reportId: input.reportId,
          type: input.type,
          value: input.value,
        },
      });
    },
  });

import * as trpc from "@trpc/server";
import { z } from "zod";
import { prisma } from "~/backend/db/client";

export const reportRouter = trpc
  .router()
  .query("get-all", {
    async resolve() {
      return await prisma.report.findMany({
        select: {
          id: true,
          description: true,
          measurement: { select: { type: true, value: true } },
        },
      });
    },
  })
  .query("get-by-id", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      return await prisma.report.findFirst({
        where: {
          id: input.id,
        },
      });
    },
  })
  .mutation("create", {
    input: z.object({
      description: z.string().min(5).max(100),
      measurements: z.array(
        z.object({
          value: z.number(),
          type: z.string(),
        })
      ),
    }),
    async resolve({ input }) {
      const report = await prisma.report.create({
        data: {
          description: input.description,
        },
      });
      const measurements = await prisma.measurement.createMany({
        data: input.measurements.map((m) => ({ ...m, reportId: report.id })),
      });
      return await prisma.report.findFirst({ where: { id: report.id } });
    },
  });

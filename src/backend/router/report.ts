import * as trpc from '@trpc/server';
import { z } from 'zod';
import { prisma } from "../../db/client";

export const reportRouter = trpc
  .router()
  .query('get-all', {
    async resolve() {
      return await prisma.report.findMany();
    },
  })
  .query("get-by-id", { 
    input: z.object({ 
      id: z.string() 
    }),
    async resolve({ input }) {
      return await prisma.report.findFirst({
        where: { 
          id: input.id 
        },
      });
    }
  })
  .mutation("create", { 
    input: z.object({ 
      description: z.string().min(5).max(100)
    }),
    async resolve({ input }) {
      return await prisma.report.create({
        data: {
          description: input.description
        }
      })
    }
  });
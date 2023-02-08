import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const measureRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.measure.create({
        data: {
          MeasureItem: {
            createMany: { data: { name: "Łdyka", value: "123" } },
          },
        },
      });
    }),
});

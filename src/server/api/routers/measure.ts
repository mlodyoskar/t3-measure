/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import type { FormFieldNames } from "../../../pages/measures/new";
import { CreateMeasure, formFieldNames } from "../../../pages/measures/new";

export const measureRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const allMeasurements = await ctx.prisma.measure.findMany({
      where: { userId: ctx.session.user.id },
      select: {
        id: true,
        createdAt: true,
        MeasureItem: {
          select: {
            value: true,
            MeasureField: { select: { name: true, displayName: true } },
          },
        },
      },
    });

    return allMeasurements.map(({ id, createdAt, MeasureItem }) => {
      return {
        id,
        createdAt,
        measurements: MeasureItem.reduce((acc, { value, MeasureField }) => {
          return { ...acc, [MeasureField.name]: value };
        }, {}),
      };
    });
  }),
  create: protectedProcedure
    .input(CreateMeasure)
    .mutation(async ({ ctx, input: { date, ...input } }) => {
      console.log(input);
      try {
        const isMeasureField = (
          fieldName: string
        ): fieldName is FormFieldNames => {
          const keys = formFieldNames.map(({ name }) => name);
          return keys.includes(fieldName as FormFieldNames);
        };

        const fieldsNameAndId = await ctx.prisma.measureField.findMany({
          where: { name: { in: Object.keys(input) } },
          select: { id: true, name: true },
        });

        const fieldsWithIdAndValue = fieldsNameAndId.reduce<
          { measureFieldId: string; value: number }[]
        >((acc, { id, name }) => {
          if (isMeasureField(name)) {
            return [
              ...acc,
              {
                measureFieldId: id,
                value: Number(input[name]),
              },
            ];
          }
          return acc;
        }, []);

        return await ctx.prisma.measure.create({
          data: {
            User: { connect: { id: ctx.session.user.id } },
            createdAt: date,
            MeasureItem: {
              createMany: {
                data: fieldsWithIdAndValue,
              },
            },
          },
        });
      } catch (error) {
        console.log(error);
        return { error: error };
      }
    }),
});

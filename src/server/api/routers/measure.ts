import { TRPCError } from "@trpc/server";
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import type { FormFieldNames } from "../../../pages/measures/new";
import { CreateMeasure, formFieldNames } from "../../../pages/measures/new";

const isMeasureField = (fieldName: string): fieldName is FormFieldNames => {
  const keys = formFieldNames.map(({ name }) => name);
  return keys.includes(fieldName as FormFieldNames);
};

export const measureRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const allMeasurements = await ctx.prisma.measure.findMany({
      where: { userId: ctx.session.user.id },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        createdAt: true,
        weight: true,
        MeasureItem: {
          select: {
            value: true,
            MeasureField: { select: { name: true, displayName: true } },
          },
        },
      },
    });

    return allMeasurements.map(({ id, createdAt, weight, MeasureItem }) => {
      return {
        id,
        createdAt,
        weight,
        measurements: MeasureItem.reduce<Record<string, string | number>>(
          (acc, { value, MeasureField }) => {
            return { ...acc, [MeasureField.name]: value };
          },
          {}
        ),
      };
    });
  }),
  create: protectedProcedure
    .input(CreateMeasure)
    .mutation(async ({ ctx, input: { date, weight, ...input } }) => {
      try {
        const fieldsNameAndId = await ctx.prisma.measureField.findMany({
          where: { name: { in: Object.keys(input) } },
          select: { id: true, name: true },
        });

        if (fieldsNameAndId.length <= 0) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "No fields found in db",
          });
        }

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
            weight: Number(weight),
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

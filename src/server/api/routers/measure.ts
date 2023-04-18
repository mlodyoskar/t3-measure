import { TRPCError } from "@trpc/server";
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { CreateMeasure } from "../../../pages/measures/new";

// const isMeasureField = (fieldName: string): fieldName is FormFieldNames => {
//   const keys = formFieldNames.map(({ name }) => name);
//   return keys.includes(fieldName as FormFieldNames);
// };

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
          where: {
            MeasureField: {
              ChoosenMeasureFields: { every: { choosen: true } },
            },
          },
          select: {
            value: true,
            MeasureField: {
              select: { name: true, displayName: true },
            },
          },
        },
      },
    });

    const measurements = allMeasurements.map(
      ({ id, createdAt, weight, MeasureItem }) => {
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
      }
    );

    const headers = allMeasurements[0]?.MeasureItem.map(
      ({ MeasureField }) => MeasureField
    );

    return {
      headers,
      measurements,
    };
  }),
  addWeightOnly: protectedProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.measure.create({
        data: {
          User: { connect: { id: ctx.session.user.id } },
          weight: input,
        },
      });
    }),
  create: protectedProcedure
    .input(CreateMeasure)
    .mutation(
      async ({ ctx, input: { date, weight, note, feeling, fields } }) => {
        try {
          if (Object.keys(fields).length <= 0) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "No fields found in db",
            });
          }

          return await ctx.prisma.measure.create({
            data: {
              User: { connect: { id: ctx.session.user.id } },
              createdAt: date,
              weight: Number(weight),
              note,
              feeling,
              MeasureItem: {
                createMany: {
                  data: Object.entries(fields).map(([key, value]) => ({
                    measureFieldId: key,
                    value: Number(value),
                  })),
                },
              },
            },
          });
        } catch (error) {
          console.log(error);
          return { error: error };
        }
      }
    ),
  createDefaultUserMeasureFields: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const allMeasureFields = await ctx.prisma.measureField.findMany({
        select: { id: true },
      });

      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      await Promise.all(
        allMeasureFields.map(async ({ id }) => {
          await ctx.prisma.choosenMeasureField.create({
            data: {
              measureFieldId: id,
              userId: input.userId,
              choosen: true,
            },
          });
        })
      );
    }),
  updateUserMeasureFields: protectedProcedure
    .input(z.record(z.boolean()))
    .mutation(async ({ ctx, input }) => {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      await Promise.all(
        Object.entries(input).map(async ([key, value]) => {
          await ctx.prisma.choosenMeasureField.update({
            data: { choosen: value },
            where: {
              measureFieldId_userId: {
                userId: ctx.session.user.id,
                measureFieldId: key,
              },
            },
          });
        })
      );
    }),
  getUserMeasureFields: protectedProcedure
    .input(z.object({ choosenFields: z.boolean() }))
    .query(async ({ ctx, input }) => {
      const measureFields = await ctx.prisma.choosenMeasureField.findMany({
        where: {
          userId: ctx.session.user.id,
          choosen: input.choosenFields ? true : undefined,
        },
        select: {
          MeasureField: { select: { id: true, name: true, displayName: true } },
          choosen: true,
        },
      });

      return measureFields.map(({ MeasureField, choosen }) => ({
        ...MeasureField,
        choosen,
      }));
    }),
  geAllMeasureFields: protectedProcedure.query(async ({ ctx }) => {
    const measureFields = await ctx.prisma.measureField.findMany({});

    return measureFields.map(({ id, name, displayName }) => ({
      id,
      name,
      displayName,
    }));
  }),
});

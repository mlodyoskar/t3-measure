import { z } from "zod";
import Form from "../../components/forms/Form";
import { useZodForm } from "../../utils/useZodForm";
import { Input } from "../../components/forms/Input";
import { Button } from "../../components/ui/Button";
import { api } from "../../utils/api";
import { useRouter } from "next/router";
import { Textarea } from "../../components/forms/Textarea";
import { Divider } from "../../components/ui/Divider";
import { RadioGroup } from "@headlessui/react";
import { Controller } from "react-hook-form";
import { FileInput } from "../../components/ui/FileInput";

const positiveDecimalRegex = /^(?!0)\d+(\.\d{1})?$/;
const MEASURE_FIELD_ERROR_MESSAGE = "Wartość musi być liczbą dodatnią";

export const formFieldNames = [
  {
    name: "calf",
    displayName: "Łydka",
  },
  {
    name: "thigh",
    displayName: "Udo",
  },
  {
    name: "neck",
    displayName: "Kark",
  },
  {
    name: "chest",
    displayName: "Klatka piersiowa",
  },
  {
    name: "waist",
    displayName: "Pas",
  },
  {
    name: "biceps",
    displayName: "Biceps",
  },
] as const;

export type FormFieldNames = (typeof formFieldNames)[number]["name"];

export const CreateMeasure = z.object({
  date: z.date(),
  weight: z.string().regex(positiveDecimalRegex, MEASURE_FIELD_ERROR_MESSAGE),
  neck: z.string().regex(positiveDecimalRegex, MEASURE_FIELD_ERROR_MESSAGE),
  thigh: z.string().regex(positiveDecimalRegex, MEASURE_FIELD_ERROR_MESSAGE),
  calf: z.string().regex(positiveDecimalRegex, MEASURE_FIELD_ERROR_MESSAGE),
  waist: z.string().regex(positiveDecimalRegex, MEASURE_FIELD_ERROR_MESSAGE),
  chest: z.string().regex(positiveDecimalRegex, MEASURE_FIELD_ERROR_MESSAGE),
  biceps: z.string().regex(positiveDecimalRegex, MEASURE_FIELD_ERROR_MESSAGE),
  note: z
    .string()
    .max(254, "Notatka nie może być dłuższa niż 254 znaki")
    .optional(),
  feeling: z.union([
    z.literal("worst"),
    z.literal("neutral"),
    z.literal("good"),
    z.literal("happy"),
    z.literal("best"),
  ]),
});

const feelings = [
  { emoji: "🤕", value: "worst" },
  { emoji: "😐", value: "neutral" },
  { emoji: "😏", value: "good" },
  { emoji: "🙂", value: "happy" },
  { emoji: "🤩", value: "best" },
] as const;

const NewMeasurePage = () => {
  const form = useZodForm({ schema: CreateMeasure });
  const { mutate, isLoading } = api.measure.create.useMutation();
  const todaysDate = new Date().toISOString().slice(0, 10);
  const router = useRouter();

  return (
    <div>
      <Form
        form={form}
        onSubmit={(data) => {
          console.log(data);
          mutate(data, {
            onSuccess: () => {
              void router.push("/");
            },
          });
        }}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-stretch gap-4  sm:flex-row">
            <Input
              type="date"
              defaultValue={todaysDate}
              label="Data pomiaru"
              {...form.register("date", { valueAsDate: true })}
            />
            <Input
              inputMode="decimal"
              type="text"
              min="0"
              label="Waga"
              {...form.register("weight")}
            />
          </div>
          <Divider />
          <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-3  sm:flex-row">
            {formFieldNames.map(({ name, displayName }) => {
              return (
                <Input
                  key={name}
                  type="text"
                  inputMode="decimal"
                  min="0"
                  label={displayName}
                  {...form.register(name)}
                />
              );
            })}
          </div>
          <Divider />
          <Textarea label="Notatka" {...form.register("note")} />
          <Controller
            control={form.control}
            defaultValue={feelings[0].value}
            name="feeling"
            render={({ field }) => (
              <div className="w-full">
                <RadioGroup {...field}>
                  <RadioGroup.Label className="mb-2 text-sm text-gray-600">
                    Jakie jest Twoje samopoczucie?
                  </RadioGroup.Label>
                  <div className="flex flex-wrap gap-3">
                    {feelings.map(({ emoji, value }) => (
                      <RadioGroup.Option
                        key={value}
                        value={value}
                        className={({ checked }) =>
                          `
                  ${
                    checked
                      ? " border border-emerald-600"
                      : "border border-gray-300 bg-white"
                  }
                    relative flex cursor-pointer rounded-md px-4 py-3 shadow-sm focus:outline-none`
                        }
                      >
                        <div className="flex w-full items-center justify-between">
                          {emoji}
                        </div>
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            )}
          />
          <Button type="submit">Dodaj nowy pomiar {isLoading}</Button>
        </div>
      </Form>
    </div>
  );
};

export default NewMeasurePage;

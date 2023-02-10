import { z } from "zod";
import Form from "../../components/forms/Form";
import { useZodForm } from "../../utils/useZodForm";
import { Input } from "../../components/forms/Input";
import { Button } from "../../components/ui/Button";
import { api } from "../../utils/api";

const positiveDecimalRegex = /^\d+(\.\d{1})?$/;
const MEASURE_FIELD_ERROR_MESSAGE = "Wartość musi być liczbą dodatnią";

export const formFieldNames = [
  {
    name: "calf",
    displayName: "Łydka",
  },
  {
    name: "tigh",
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
  weight: z.string(),
  neck: z.string().regex(positiveDecimalRegex, MEASURE_FIELD_ERROR_MESSAGE),
  tigh: z.string().regex(positiveDecimalRegex, MEASURE_FIELD_ERROR_MESSAGE),
  calf: z.string().regex(positiveDecimalRegex, MEASURE_FIELD_ERROR_MESSAGE),
  waist: z.string().regex(positiveDecimalRegex, MEASURE_FIELD_ERROR_MESSAGE),
  chest: z.string().regex(positiveDecimalRegex, MEASURE_FIELD_ERROR_MESSAGE),
  biceps: z.string().regex(positiveDecimalRegex, MEASURE_FIELD_ERROR_MESSAGE),
});

const NewMeasurePage = () => {
  const form = useZodForm({ schema: CreateMeasure });
  const { mutate } = api.measure.create.useMutation();
  const todaysDate = new Date().toISOString().slice(0, 10);

  return (
    <div>
      <Form
        form={form}
        onSubmit={(data) => {
          console.log(data.date.toISOString());
          const res = mutate(data);
          console.log(res);
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
          <div className="h-[1px] w-full rounded-lg bg-gray-200"></div>

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
          <Button type="submit">Dodaj nowy pomiar</Button>
        </div>
      </Form>
    </div>
  );
};

export default NewMeasurePage;

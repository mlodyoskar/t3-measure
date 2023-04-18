import {
  MEASURE_FIELD_ERROR_MESSAGE,
  positiveDecimalRegex,
} from "../../../pages/measures/new";
import { useZodForm } from "../../../utils/useZodForm";
import { z } from "zod";

const WeightFormSchema = z.object({
  weight: z.string().regex(positiveDecimalRegex, MEASURE_FIELD_ERROR_MESSAGE),
});

export const useAddWeightModal = () => {
  const form = useZodForm({ schema: WeightFormSchema });

  return { form };
};

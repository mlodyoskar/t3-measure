import { z } from "zod";
import Form from "../../components/forms/Form";
import { useZodForm } from "../../utils/useZodForm";
import { Input } from "../../components/forms/Input";
import { Button } from "../../components/ui/Button";

const CreateMeasure = z.object({
  name: z.string().min(1),
});

const NewMeasurePage = () => {
  const form = useZodForm({ schema: CreateMeasure });
  return (
    <div className="flex max-w-4xl items-center bg-gray-200">
      <Form
        form={form}
        onSubmit={(data) => {
          console.log(data);
        }}
      >
        <Input label="Name" {...form.register("name")} />
        <Button type="submit">Dodaj nowy pomiar</Button>
      </Form>
    </div>
  );
};

export default NewMeasurePage;

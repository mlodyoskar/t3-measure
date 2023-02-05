import { z } from "zod";
import Form from "../../components/forms/Form";
import { useZodForm } from "../../utils/useZodForm";
import { Input } from "../../components/forms/Input";
import { Button } from "../../components/ui/Button";

const CreateMeasure = z.object({
  name: z.string(),
});

const NewMeasurePage = () => {
  const form = useZodForm({ schema: CreateMeasure });
  return (
    <div>
      <Form
        form={form}
        onSubmit={(data) => {
          console.log(data);
        }}
      >
        <div className="flex flex-col gap-4">
          <Input label="Name" {...form.register("name")} />
          <Button type="submit">Dodaj nowy pomiar</Button>
        </div>
      </Form>
    </div>
  );
};

export default NewMeasurePage;

import { api } from "../../../utils/api";
import Form from "../../forms/Form";
import { Input } from "../../forms/Input";
import { Button } from "../../ui/Button";
import { Modal } from "../../ui/Modal";
import { useAddWeightModal } from "./useAddWeightModal";

interface Props {
  isOpen: boolean;
  closeHandler: () => void;
}

export const AddWeightModal = ({ isOpen, closeHandler }: Props) => {
  const { form } = useAddWeightModal();
  const { mutate } = api.measure.addWeightOnly.useMutation();
  const utils = api.useContext();
  const onClose = () => {
    closeHandler();
  };

  return (
    <Modal
      isOpen={isOpen}
      title="Dodaj pomiar wagi"
      closeHandler={onClose}
      shouldCloseOnOverlayClick={true}
    >
      <Form
        onSubmit={({ weight }) => {
          const formattedWeight = Number(weight.replace(",", "."));
          mutate(formattedWeight, {
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSuccess: async () => {
              await utils.invalidate(undefined);
            },
          });
          onClose();
          form.reset();
        }}
        form={form}
      >
        <p className="text-sm text-gray-700">
          Wpis zostanie dodany z wagą dzisiejszą
        </p>
        <div className="mt-4 flex gap-2">
          <Input
            inputMode="decimal"
            label="Waga"
            {...form.register("weight")}
          />
          <Button className="mt-auto py-[11px] px-[20px]">Zapisz</Button>
        </div>
      </Form>
    </Modal>
  );
};

import { Toggle } from "../../forms/Toggle";
import { Button } from "../../ui/Button";
import { Modal } from "../../ui/Modal";
import { useFirstLoginModal } from "./useFirstLoginModal";

interface Props {
  isOpen: boolean;
  closeHandler: () => void;
}

export const FirstLoginModal = ({ isOpen, closeHandler }: Props) => {
  const { data, register } = useFirstLoginModal();

  const onClose = () => {
    closeHandler();
  };

  return (
    <Modal
      isOpen={isOpen}
      title="Wybierz które części ciała chcesz mierzyć"
      closeHandler={onClose}
      shouldCloseOnOverlayClick={true}
    >
      <div>
        <p className="text-sm text-gray-500">
          Wybrane części ciała będą pojawiać się w twojej tabeli pomiarów oraz
          podczas dodawania nowego pomiaru
        </p>
        <div className="my-4 grid grid-cols-2">
          {data?.map(({ id, displayName }) => (
            <Toggle
              key={id}
              label={displayName}
              {...register(id, { value: true })}
            />
          ))}
        </div>
      </div>

      <div className="mt-4">
        <Button>Zapisz</Button>
      </div>
    </Modal>
  );
};

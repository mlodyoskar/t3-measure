/* eslint-disable @typescript-eslint/no-misused-promises */
import { Layout } from "../../components/ui/Layout";
import { Toggle } from "../../components/forms/Toggle";
import { useForm } from "react-hook-form";
import { Button } from "../../components/ui/Button";
import { prisma } from "../../server/db";
import { api } from "../../utils/api";
import { useRouter } from "next/router";
import { Spinner } from "../../components/ui/icons";

const MeasureSettingsPage = () => {
  const { register, handleSubmit } = useForm();
  const { mutate, isLoading } =
    api.measure.updateUserMeasureFields.useMutation();
  const router = useRouter();
  const utils = api.useContext();
  const { data, isLoading: areFieldsLoading } =
    api.measure.getUserMeasureFields.useQuery({
      choosenFields: false,
    });
  if (areFieldsLoading) {
    return (
      <div>
        <Spinner className="fill-emerald-500" />
      </div>
    );
  }

  return (
    <Layout>
      <h1 className="text-2xl text-gray-700">Ustawienia pomiarów</h1>
      <p className="my-3 text-sm text-gray-600">
        Wybierz które pola chcesz, aby pojawiały się w twojej tabeli, oraz były
        widoczne przy dodawaniu nowego pomiaru.
      </p>
      <form
        onSubmit={handleSubmit((data) => {
          mutate(data, {
            onSuccess: async () => {
              void router.push("/measures");
              await utils.measure.getUserMeasureFields.refetch();
            },
          });
        })}
        className="grid grid-cols-2 gap-4"
      >
        {data?.map(({ id, displayName, choosen }) => (
          <Toggle
            key={id}
            label={displayName}
            {...register(id, { value: choosen })}
          />
        ))}
        <div className="col-span-full">
          <Button fullWidth={true} isLoading={isLoading}>
            Zapisz ustawienia
          </Button>
        </div>
      </form>
    </Layout>
  );
};

export default MeasureSettingsPage;

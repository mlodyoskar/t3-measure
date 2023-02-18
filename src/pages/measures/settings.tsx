import { Layout } from "../../components/ui/Layout";
import { Toggle } from "../../components/forms/Toggle";
import { useForm } from "react-hook-form";
import { Button } from "../../components/ui/Button";
import type { InferGetStaticPropsType } from "next";
import { prisma } from "../../server/db";
import { api } from "../../utils/api";
import { useRouter } from "next/router";

const MeasureSettingsPage = ({
  measureFields: data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { register, handleSubmit } = useForm();
  const { mutate } = api.measure.updateUserMeasureFields.useMutation();
  const router = useRouter();

  return (
    <Layout>
      <h1 className="text-2xl text-gray-700">Ustawienia pomiarów</h1>
      <p className="my-3 text-sm text-gray-600">
        Wybierz które pola chcesz, aby pojawiały się w twojej tabeli, oraz były
        widoczne przy dodawaniu nowego pomiaru.
      </p>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit((data) => {
          mutate(data);
          void router.push("/measures");
        })}
        className="grid grid-cols-2 gap-4"
      >
        {data?.map(({ MeasureField: { id, displayName }, choosen }) => (
          <Toggle
            key={id}
            label={displayName}
            {...register(id, { value: choosen })}
          />
        ))}
        <div className="col-span-full">
          <Button>Zapisz ustawienia</Button>
        </div>
      </form>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const measureFields = await prisma.choosenMeasureField.findMany({
    orderBy: { MeasureField: { displayName: "asc" } },
    select: {
      choosen: true,
      MeasureField: { select: { id: true, displayName: true } },
    },
  });

  return {
    props: { measureFields },
  };
};

export default MeasureSettingsPage;

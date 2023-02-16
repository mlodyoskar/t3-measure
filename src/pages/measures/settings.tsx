import { Layout } from "../../components/ui/Layout";
import { api } from "../../utils/api";
import { Toggle } from "../../components/forms/Toggle";
import Form from "../../components/forms/Form";
import { useZodForm } from "../../utils/useZodForm";

const MeasureSettingsPage = () => {
  const { data } = api.measure.getAllFields.useQuery();
  console.log(data);

  return (
    <Layout>
      <h1 className="text-2xl text-gray-700">Ustawienia pomiarów</h1>
      <p className="my-3 text-sm text-gray-600">
        Wybierz które pola chcesz, aby pojawiały się w twojej tabeli, oraz były
        widoczne przy dodawaniu nowego pomiaru.
      </p>
      <div className="grid grid-cols-3 gap-4">
        {data?.map(({ id, displayName }) => (
          <Toggle label={displayName} key={id} />
        ))}
      </div>
    </Layout>
  );
};

export default MeasureSettingsPage;

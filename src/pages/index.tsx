import { type NextPage } from "next";
import { ButtonLink } from "../components/ui/ButtonLink";
import { api } from "../utils/api";
import Link from "next/link";
import { Layout } from "../components/ui/Layout";

const Home: NextPage = () => {
  const { data } = api.measure.getAll.useQuery();
  console.log(data);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <Layout title="Wszystkie pomiary">
      <main>
        <div className="flex justify-between">
          <h1 className="text-2xl text-gray-700">Wszystkie pomiary</h1>
          <div className="absolute inset-4 top-auto sm:static sm:inset-auto">
            <ButtonLink href="/measures/new">Dodaj nowy pomiar</ButtonLink>
          </div>
        </div>
        <div className="-mx-4 mt-8 overflow-x-auto rounded-lg border border-gray-200 sm:mx-0">
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Data
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Waga
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Klatka
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Pas
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Biceps
                </th>

                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Udo
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Łydka
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Szyja
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map(({ id, weight, createdAt, measurements }) => (
                <tr className="h-12 sm:h-10" key={id}>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {createdAt.toLocaleDateString("pl")}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {weight}kg
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {measurements.chest}cm
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {measurements.waist}cm
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {measurements.biceps}cm
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {measurements.thigh}cm
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {measurements.calf}cm
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {measurements.neck}cm
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    <Link
                      className="text-sm text-gray-800 underline"
                      href={`measures/${id}`}
                    >
                      Szczegóły
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </Layout>
  );
};

export default Home;

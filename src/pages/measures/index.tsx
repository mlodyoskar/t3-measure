import { type NextPage } from "next";
import { ButtonLink } from "../../components/ui/ButtonLink";
import { api } from "../../utils/api";
import Link from "next/link";
import { Layout } from "../../components/ui/Layout";
import { Loader, Spinner } from "../../components/ui/icons";

const Home: NextPage = () => {
  const { data } = api.measure.getAll.useQuery();

  if (!data) {
    return (
      <Layout>
        <div className="m-auto">
          <Spinner className="fill-emerald-500" />
        </div>
      </Layout>
    );
  }
  if (data.measurements.length === 0) {
    return (
      <Layout>
        <div className="mt-16 flex flex-col items-center justify-center text-center">
          <h2 className="mb-2  text-3xl">Nie masz jeszcze żadnych pomiarów!</h2>
          <p className="text-md ">
            Dodaj pierwszy pomiar, aby zobaczyć go tutaj!
          </p>
          <div className="mt-4 w-64">
            <ButtonLink href="/measures/new">Dodaj pierwszy pomiar</ButtonLink>
          </div>
        </div>
      </Layout>
    );
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
                {data.headers.map(({ displayName, name }) => (
                  <th
                    key={name}
                    className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900"
                  >
                    {displayName}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.measurements.map(
                ({ id, weight, createdAt, measurements }) => (
                  <tr className="h-12 sm:h-10" key={id}>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {createdAt.toLocaleDateString("pl")}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {weight}kg
                    </td>
                    {Object.values(measurements).map((value, index) => (
                      <td
                        key={`${id}-${value}-${index}`}
                        className="whitespace-nowrap px-4 py-2 text-gray-700"
                      >
                        {value}cm
                      </td>
                    ))}

                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      <Link
                        className="text-sm text-gray-800 underline"
                        href={`measures/${id}`}
                      >
                        Szczegóły
                      </Link>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </main>
    </Layout>
  );
};

export default Home;

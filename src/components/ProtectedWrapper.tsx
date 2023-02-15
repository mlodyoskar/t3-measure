/* eslint-disable @typescript-eslint/no-misused-promises */
import { useSession, signIn } from "next-auth/react";
import React from "react";
import { DiscordIcon, Loader } from "./ui/icons";
import { Layout } from "./ui/Layout";

export const ProtectedWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <Layout>
        <div className="flex h-screen items-center justify-center bg-gray-100">
          <Loader className="h-1/2 w-1/2 md:h-1/3" />
        </div>
      </Layout>
    );
  }

  if (!session) {
    return (
      <Layout title="Zaloguj się">
        <section className="h-screen bg-gray-50">
          <div className="mx-auto flex h-full flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
            <h1 className="mb-4 text-3xl">Measure 💪</h1>
            <div className=" w-full rounded-lg  bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
              <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
                <h2 className=" text-center text-xl  leading-tight tracking-tight text-gray-900 md:text-2xl">
                  Zaloguj się na swoje konto, aby dodać swoje pomiary!
                </h2>
                <button
                  onClick={async () => await signIn("discord")}
                  className="flex w-full items-center justify-center rounded-md bg-[#5865F2] px-4 text-white"
                >
                  Zaloguj się z Discord <DiscordIcon className="h-12 w-12" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return <>{children}</>;
};

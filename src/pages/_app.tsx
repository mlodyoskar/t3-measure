import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider, signIn } from "next-auth/react";

import { api } from "../utils/api";

import "../styles/globals.css";
import { Sidebar } from "../components/ui/Sidebar";
import { Button } from "../components/ui/Button";
import { ProtectedWrapper } from "../components/ProtectedWrapper";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ProtectedWrapper>
        <Sidebar>
          <Component {...pageProps} />
        </Sidebar>
      </ProtectedWrapper>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);

import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { api } from "../utils/api";
import "../styles/globals.css";
import { Sidebar } from "../components/ui/Sidebar";
import { ProtectedWrapper } from "../components/ProtectedWrapper";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <main className={inter.className}>
        <ProtectedWrapper>
          <Sidebar>
            <Component {...pageProps} />
          </Sidebar>
        </ProtectedWrapper>
      </main>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);

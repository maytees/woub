import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";

import "~/styles/globals.css";
import { useContext, createContext, useState } from "react";

export const PathContext = createContext(
  {} as {
    path: string;
    setPath: React.Dispatch<React.SetStateAction<string>>;
  }
);

export const usePath = () => {
  const { path, setPath } = useContext(PathContext);
  return { path, setPath };
}

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [path, setPath] = useState("/");

  return (
    <SessionProvider session={session}>
      <PathContext.Provider value={{ path, setPath }} >
        <Component {...pageProps} />
      </PathContext.Provider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);

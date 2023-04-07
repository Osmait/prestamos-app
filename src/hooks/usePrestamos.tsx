import { Router } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

type Props = {
  children: JSX.Element;
};

type Error = {
  error: boolean;
  message: String;
};

const PrestamosContext = createContext<any>(undefined);

export const PrestamosProvider = ({ children }: Props) => {
  const [cambio, setCambio] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    Router.events.on("routeChangeStart", () => setLoading(true));
    Router.events.on("routeChangeComplete", () => setLoading(false));
    Router.events.on("routeChangeError", () => setLoading(false));
    return () => {
      Router.events.off("routeChangeStart", () => setLoading(true));
      Router.events.off("routeChangeComplete", () => setLoading(false));
      Router.events.off("routeChangeError", () => setLoading(false));
    };
  }, []);

  return (
    <PrestamosContext.Provider
      value={{
        setCambio,
        cambio,
        loading,
        setError,
        error,
      }}
    >
      {children}
    </PrestamosContext.Provider>
  );
};

const useLoans = () => useContext(PrestamosContext);

export default useLoans;

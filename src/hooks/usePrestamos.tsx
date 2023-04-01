import { Router } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

type Props = {
  children: JSX.Element;
};

const PrestamosContext = createContext<any>(undefined);

export const PrestamosProvider = ({ children }: Props) => {
  // const [clientsList, setClientsList] = useState<clientInterface[]>();

  const [cambio, setCambio] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

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

  // useEffect(() => {
  //   const getClient = async () => {
  //     const token = Cookies.get("token");

  //     const clients: clientInterface[] = await getClients(token!);

  //     setClientsList(clients);
  //   };
  //   getClient();
  // }, [cambio]);

  return (
    <PrestamosContext.Provider
      value={{
        setCambio,
        cambio,
        loading,
      }}
    >
      {children}
    </PrestamosContext.Provider>
  );
};

const useLoans = () => useContext(PrestamosContext);

export default useLoans;

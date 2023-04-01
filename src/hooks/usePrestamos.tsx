import { createContext, useContext, useState } from "react";

type Props = {
  children: JSX.Element;
};

const PrestamosContext = createContext<any>(undefined);

export const PrestamosProvider = ({ children }: Props) => {
  // const [clientsList, setClientsList] = useState<clientInterface[]>();

  const [cambio, setCambio] = useState<boolean>(false);

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
        // clientsList,
        setCambio,
        cambio,
      }}
    >
      {children}
    </PrestamosContext.Provider>
  );
};

const useLoans = () => useContext(PrestamosContext);

export default useLoans;

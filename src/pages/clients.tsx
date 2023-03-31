import { Collapse, Text } from "@nextui-org/react";

import Loan from "@/components/Loan";
import { clientInterface } from "@/interface/client";
import { ModalAdd } from "@/components/ModalAdd";
import useLoans from "@/hooks/usePrestamos";

export default function clients() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { clientsList } = useLoans();
  return (
    <>
      <Text h1 css={{ marginInline: "auto" }}>
        Lista de Clientes
      </Text>
      <ModalAdd clients={clientsList} />
      <Collapse.Group splitted className="blur-in">
        {clientsList
          ? clientsList.map((client: clientInterface) => (
              <Collapse key={client.id} title={client.name} shadow bordered>
                <Loan clientId={client.id!} />
              </Collapse>
            ))
          : []}
      </Collapse.Group>
    </>
  );
}

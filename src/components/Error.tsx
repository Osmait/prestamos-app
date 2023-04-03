import { Button } from "@nextui-org/react";
import React from "react";

type Props = {
  children: JSX.Element;
};

export const Error = ({ children }: Props) => {
  return (
    <Button auto color="error">
      {children}
    </Button>
  );
};

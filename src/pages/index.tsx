"use client";

import useAuth from "@/hooks/useAuth";
import { Button, Text } from "@nextui-org/react";

export default function Home() {
  const { user } = useAuth();
  if (user == null) {
    return "No autorizado";
  }

  return (
    <>
      <main></main>
    </>
  );
}

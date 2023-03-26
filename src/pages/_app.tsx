import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { NextUIProvider } from "@nextui-org/react";
import Layout from "@/layout/Layout";
import { AuthProvider } from "@/hooks/useAuth";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <NextUIProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </NextUIProvider>
      </AuthProvider>
    </>
  );
}

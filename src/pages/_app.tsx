import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { NextUIProvider, createTheme, Loading } from "@nextui-org/react";
import Layout from "@/layout/Layout";
import { AuthProvider } from "@/hooks/useAuth";
import { PrestamosProvider } from "@/hooks/usePrestamos";
import { Suspense } from "react";

const theme = createTheme({
  type: "dark", // it could be "light" or "dark"
  theme: {
    colors: {
      background: "#16181A",
      // brand colors
      primaryLight: "$green200",
      primaryLightHover: "$green300",
      primaryLightActive: "$green400",
      primaryLightContrast: "$green600",
      primary: "#0099e5",
      primaryBorder: "$green500",
      primaryBorderHover: "$green600",
      primarySolidHover: "$green700",
      primarySolidContrast: "$white",
      primaryShadow: "$green500",

      gradient:
        "linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)",
      link: "#5E1DAD",

      // you can also create your own color
      myColor: "#ff4ecd",

      // ...  more colors
    },
    space: {},
    fonts: {},
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <PrestamosProvider>
          <NextUIProvider theme={theme}>
            <Layout>
              <Suspense fallback={<Loading />}>
                <Component {...pageProps} />
              </Suspense>
            </Layout>
          </NextUIProvider>
        </PrestamosProvider>
      </AuthProvider>
    </>
  );
}

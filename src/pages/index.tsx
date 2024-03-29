import { Charts } from "@/components/charts";
import useAuth from "@/hooks/useAuth";
import useLoans from "@/hooks/usePrestamos";

import { loanInterface } from "@/interface/loan";

import { faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Container, Grid, Row, Spacer, Text } from "@nextui-org/react";
import axios from "axios";
import cookieParser from "cookie-parser";
import { GetServerSideProps } from "next";

import Loading from "../components/loading";

type Props = {
  user: any;
  loanDate: loanInterface[];
  loan: loanInterface[];
};
const API = process.env.NEXT_PUBLIC_API;

export default function Home({ user, loan, loanDate }: Props) {
  const { setUser } = useAuth();
  const { loading } = useLoans();

  setUser(user);
  if (user == null) {
    return;
  }
  let Total = 0;

  loan.forEach((lo: loanInterface) => {
    Total += lo.amount;
  });

  return (
    <div className="blur-in ">
      <Text h1 transform="capitalize" css={{ textAlign: "center" }}>
        <Text span css={{ margin: "$10" }}>
          <FontAwesomeIcon icon={faHome} width={"30px"} />
        </Text>
        Inicio
      </Text>
      <Text h3 css={{ marginLeft: "$10" }}>
        {" "}
        Capital Invertido: ${Total}
      </Text>

      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="home-chart">
            <Charts />
          </div>

          <Container>
            <Spacer y={1.6} />

            <Spacer y={1.6} />
            <Row>
              <Container xs>
                <Text h2>Proximos Cobros</Text>

                <Grid.Container gap={2} className={"container_clients"}>
                  {loanDate ? (
                    loanDate.map((loan: loanInterface) => (
                      <Grid.Container
                        direction="row"
                        gap={2}
                        className="blur-in"
                        key={loan.id}
                      >
                        <Grid xs={12} md>
                          <Card variant="bordered" isPressable isHoverable>
                            <Card.Header
                              css={{ justifyContent: "space-between" }}
                            >
                              <FontAwesomeIcon icon={faUser} width={"20px"} />
                              <Text span>
                                {` ${loan.paymentDate[0]}-${loan.paymentDate[1]}-${loan.paymentDate[2]}`}
                              </Text>
                            </Card.Header>

                            <Card.Body css={{ justifyItems: "center" }}>
                              <Text
                                h3
                                transform="capitalize"
                                css={{ textAlign: "center" }}
                              >
                                {loan.client}
                              </Text>

                              <Text
                                h3
                                transform="capitalize"
                                css={{ textAlign: "center" }}
                              >
                                $ {loan.amount}
                              </Text>
                            </Card.Body>
                          </Card>
                        </Grid>
                      </Grid.Container>
                    ))
                  ) : (
                    <Text>No Hay Cobros Para Hoy</Text>
                  )}
                </Grid.Container>
              </Container>
            </Row>
          </Container>
        </>
      )}
    </div>
  );
}
export const getServerSideProps: GetServerSideProps = async (context: any) => {
  // Parse cookies
  cookieParser(context.req, context.res);

  const { token } = context.req.cookies;

  const config = {
    headers: {
      "content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const [userResponse, loanResponse, loanDateResponse] = await Promise.all([
      axios.get(`${API}/profile`, config),
      axios.get(`${API}/loan`, config),
      axios.get(`${API}/loan/payment-day`, config),
    ]);

    const { data: user } = userResponse;
    const { data: loan } = loanResponse;
    const { data: loanDate } = loanDateResponse;

    return {
      props: { user, loan, loanDate },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
};

import {
  Container,
  Grid,
  Loading as LoandingPage,
  Spacer,
} from "@nextui-org/react";

export default function Loading() {
  return (
    <Container
      display="grid"
      justify="center"
      alignContent="center"
      alignItems="center"
    >
      <Spacer y={3.5} /> <LoandingPage type="points" />
    </Container>
  );
}

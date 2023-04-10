import Login from "@/pages/login";
import { render, screen } from "@testing-library/react";
jest.mock("next/router", () => ({
  push: jest.fn(),
  back: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
  },
  beforePopState: jest.fn(() => null),
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("Login Test", () => {
  it("Render Componet", () => {
    render(<Login />);

    const title = screen.getByTestId("login");
    expect(title).toBeInTheDocument();
  });

  it("Redenr Form", () => {
    render(<Login />);
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });
});

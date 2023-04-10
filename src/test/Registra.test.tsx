import Registrar from "@/pages/registra";
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

// jest.mock("@/pages/api/signUp", () => ({
//   signUp: jest.fn(),
// }));

describe("Test Pages Registro ", () => {
  it("Test Render Pages", () => {
    render(<Registrar />);

    const title = screen.getByTestId("title");
    expect(title).toBeInTheDocument();
  });

  it("Render Form", () => {
    render(<Registrar />);

    const nameInput = screen.getByLabelText("Name");
    const lastNameInput = screen.getByLabelText("Last Name");
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: /Registrar/i });

    expect(nameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
});

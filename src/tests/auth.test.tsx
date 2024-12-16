import { Header } from "@/components/Header";
import { useContextProject } from "@/contexts/ContextProject";
import { screen, render, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
jest.mock("@/contexts/ContextProject", () => ({
  useContextProject: jest.fn(),
}));
const mockPush = jest.fn();

describe("Renderiza Header para login/register", () => {
  it("Renderiza para iniciar sesión", () => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    (useContextProject as jest.Mock).mockReturnValue({
      user: "Albert",
      logout: jest.fn(),
    });

    render(<Header />);

    expect(screen.getByText("Cerrar Sesión")).toBeInTheDocument();
    expect(screen.getByText("Albert")).toBeInTheDocument();
  });

  it("Renderiza para registrarse", () => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    (useContextProject as jest.Mock).mockReturnValue({
      user: "",
      logout: jest.fn(),
    });

    render(<Header />);

    expect(screen.getByText("Registrarse")).toBeInTheDocument();

  });
});

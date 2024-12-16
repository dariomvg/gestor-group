import Proyectos from "@/app/proyectos/page";
import { useFindProject } from "@/hooks/useFindProject";
import { useHandleProject } from "@/hooks/useHandleProject";
import { screen, render } from "@testing-library/react";


jest.mock("@/hooks/useHandleProject", () => ({
    useHandleProject: jest.fn(),
  }));
  
  const projects = [
    {
        id: 0,
        title: "react",
        description: "framework",
        start_date: "2024-05-15",
        last_date: "2024-05-20",
        creator: "",
        content: "",
        password: "",
        tasks: [],
        messages: [],
      },
      {
        id: 1,
        title: "javascript",
        description: "lenguage",
        start_date: "2024-05-05",
        last_date: "2024-05-10",
        creator: "",
        content: "",
        password: "",
        tasks: [],
        messages: [],
      }
  ]

describe("Renderiza ruta proyectos", () => {
  it("Renderiza proyectos cuando los hay", () => {

    (useHandleProject as jest.Mock).mockReturnValue({
      projects,
    });

    render(<Proyectos />);

    expect(screen.getByText("react")).toBeInTheDocument();
    expect(screen.getByText("framework")).toBeInTheDocument();
    expect(screen.getByText("2024-05-15")).toBeInTheDocument();
    expect(screen.getByText("2024-05-20")).toBeInTheDocument();
    expect(screen.getByText("javascript")).toBeInTheDocument();
    expect(screen.getByText("lenguage")).toBeInTheDocument();
    expect(screen.getByText("2024-05-05")).toBeInTheDocument();
    expect(screen.getByText("2024-05-10")).toBeInTheDocument();
  });

  it("Renderiza mensaje cuando no hay proyectos", () => {

    (useHandleProject as jest.Mock).mockReturnValue({
      projects: [],
    });

    render(<Proyectos />);

    expect(screen.getByText("No tienes proyectos creados")).toBeInTheDocument();
    expect(screen.getByText("Crear proyecto")).toBeInTheDocument();
  });
});

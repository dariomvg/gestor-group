import Nuevo from "@/app/nuevo/page";
import { useContextProject } from "@/contexts/ContextProject";
import { useFindProject } from "@/hooks/useFindProject";
import { useHandleProject } from "@/hooks/useHandleProject";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/hooks/useHandleProject", () => ({
  useHandleProject: jest.fn(),
}));

jest.mock("@/contexts/ContextProject", () => ({
  useContextProject: jest.fn(),
}));

jest.mock("@/hooks/useFindProject", () => ({
  useFindProject: jest.fn(),
}));

afterEach(() => {
  jest.clearAllMocks();
});

const mockPush = jest.fn();
const addProject = jest.fn();
const project = {
  id: 0,
  title: "",
  description: "",
  start_date: "",
  last_date: "",
  creator: "",
  content: "",
  password: "",
  tasks: [],
  messages: [],
};

describe("Renderizar el formulario para crear proyectos", () => {
  it("Comprobar renderización de inputs ", async () => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    (useContextProject as jest.Mock).mockReturnValue({
      user: "user one",
    });
    (useHandleProject as jest.Mock).mockReturnValue({
      addProject,
    });
    (useFindProject as jest.Mock).mockReturnValue({
      project,
    });
    render(<Nuevo params={{ id: null }} />);

    const inputTitle = screen.getByLabelText("Nombre del proyecto");
    const inputDesc = screen.getByLabelText("Descripción del proyecto");
    const inputPass = screen.getByLabelText("Contraseña del proyecto");
    const inputStart = screen.getByLabelText("Inicio");
    const inputEnd = screen.getByLabelText("Término");

    await userEvent.type(inputTitle, "react");
    await userEvent.type(inputDesc, "framework");
    await userEvent.type(inputPass, "1234567890");
    await userEvent.type(inputStart, "2024-06-06");
    await userEvent.type(inputEnd, "2024-06-12");

    await waitFor(() => {
      expect(inputTitle).toHaveValue("react");
      expect(inputDesc).toHaveValue("framework");
      expect(inputPass).toHaveValue("1234567890");
      expect(inputStart).toHaveValue("2024-06-06");
      expect(inputEnd).toHaveValue("2024-06-12");
    });
  });

  it("Comprobar llamada de la función", async () => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    (useContextProject as jest.Mock).mockReturnValue({
      user: "user one",
    });
    (useHandleProject as jest.Mock).mockReturnValue({
      addProject,
    });
    (useFindProject as jest.Mock).mockReturnValueOnce({
      project,
    });
    render(<Nuevo params={{ id: null }} />);
    const inputTitle = screen.getByLabelText("Nombre del proyecto");
    const inputDesc = screen.getByLabelText("Descripción del proyecto");
    const inputPass = screen.getByLabelText("Contraseña del proyecto");
    const inputStart = screen.getByLabelText("Inicio");
    const inputEnd = screen.getByLabelText("Término");
    const inputSubmit = screen.getByDisplayValue("Crear");

    await userEvent.type(inputTitle, "react");
    await userEvent.type(inputDesc, "framework");
    await userEvent.type(inputPass, "1234567890");
    await userEvent.type(inputStart, "2024-06-06");
    await userEvent.type(inputEnd, "2024-06-12");

    await waitFor(() => {
      expect(inputTitle).toHaveValue("react");
      expect(inputDesc).toHaveValue("framework");
      expect(inputPass).toHaveValue("1234567890");
      expect(inputStart).toHaveValue("2024-06-06");
      expect(inputEnd).toHaveValue("2024-06-12");
    });

    await userEvent.click(inputSubmit);

    await waitFor(() => {
      expect(addProject).toHaveBeenCalledWith(
        {
          id: 0,
          title: "react",
          description: "framework",
          start_date: "2024-06-06",
          last_date: "2024-06-12",
          creator: "",
          content: "",
          password: "1234567890",
          tasks: [],
          messages: [],
        },
        "user one"
      );
    });
  });

  it("Comprobar formulario para actualizar proyecto", async () => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    (useHandleProject as jest.Mock).mockReturnValue({
      addProject,
    });
    (useContextProject as jest.Mock).mockReturnValue({
      user: "user one",
    });
    (useFindProject as jest.Mock).mockReturnValue({
      project: {
        id: 0,
        title: "react",
        description: "framework",
        start_date: "2024-06-07",
        last_date: "2024-06-10",
        creator: "",
        content: "",
        password: "1234567890",
        tasks: [],
        messages: [],
      },
    });
    render(<Nuevo params={{ id: "1" }} />);

    const inputTitle = screen.getByLabelText("Nombre del proyecto");
    const inputDesc = screen.getByLabelText("Descripción del proyecto");
    const inputPass = screen.getByLabelText("Contraseña del proyecto");
    const inputStart = screen.getByLabelText("Inicio");
    const inputEnd = screen.getByLabelText("Término");
    const inputSubmit = screen.getByDisplayValue("Crear");

    await userEvent.type(inputTitle, " 2");
    await userEvent.type(inputDesc, " 2");
    fireEvent.change(inputStart, { target: { value: "2024-06-07" } });
    fireEvent.change(inputEnd, { target: { value: "2024-06-10" } });

      expect(inputTitle).toHaveValue("react 2");
      expect(inputDesc).toHaveValue("framework 2");
      expect(inputPass).toHaveValue("1234567890");
      expect(inputStart).toHaveValue("2024-06-07");
      expect(inputEnd).toHaveValue("2024-06-10");
   

    await userEvent.click(inputSubmit);

    await waitFor(() => {
      expect(addProject).toHaveBeenCalledWith(
        {
          id: 0,
          title: "react 2",
          description: "framework 2",
          start_date: "2024-06-07",
          last_date: "2024-06-10",
          creator: "",
          content: "",
          password: "1234567890",
          tasks: [],
          messages: [],
        },
        "user one"
      );
    });
  });
});

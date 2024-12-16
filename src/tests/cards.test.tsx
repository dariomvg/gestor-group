import { CardProject } from "@/components/CardProject"
import {screen, render} from "@testing-library/react"

const item = {
    id: 0,
    title: "react",
    description: "framework",
    start_date: "2024-08-10",
    last_date: "2024-08-20",
    creator: "",
    content: "",
    password: "",
    tasks: [],
    messages: [],
}

describe("Renderiza las props en CardProject", () => {
    it("Se muestran correctamente las props", () => {
        render(<CardProject item={item} />)

        expect(screen.getByText("react")).toBeInTheDocument();
        expect(screen.getByText("framework")).toBeInTheDocument();
        expect(screen.getByText("2024-08-10")).toBeInTheDocument();
        expect(screen.getByText("2024-08-20")).toBeInTheDocument();

    })
});

import ProviderProject from "@/contexts/ContextProject";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "GestorGroup - gestiona tus proyectos con tu grupo de trabajo o estudio",
  description:
    "Gestiona tus tareas, proyectos de trabajo, estudio o personal invitando colaboradores para aportar",
  keywords: ["proyectos", "gestionar", "colaboradores", "herramientas"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <ProviderProject>{children}</ProviderProject>
      </body>
    </html>
  );
}

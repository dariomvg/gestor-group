import type { Metadata } from "next";
import "./globals.css";
import ProviderAuth from "@/contexts/ContextAuth";

export const metadata: Metadata = {
  title: "GestorGroup - Gestor de proyectos",
  description:
    "Gestiona tus tareas y/o proyectos de trabajo, estudio o personal con tu propio grupo",
  keywords: ["proyectos", "gestionar", "colaboradores", "herramientas"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <ProviderAuth>{children}</ProviderAuth>
      </body>
    </html>
  );
}

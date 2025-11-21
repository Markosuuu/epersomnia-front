import type { ReactNode } from "react";
import { Link } from "wouter";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="min-h-screen">
      {/* Header global */}
      <h1 className="text-2xl font-bold my-4 text-center tracking-wider">
        <Link to="/">Torre de los sueños</Link>
      </h1>
      <div className="border-b border-purple-700 w-full mb-8 text-center" />

      {/* Contenido de cada página */}
      {children}
    </div>
  );
}

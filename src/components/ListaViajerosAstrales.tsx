import { useEffect, useState } from "react";
import CardViajeroAstral from "./CardViajeroAstral";

export type EnergiaElemental = {
  fuego: number;
  agua: number;
  aire: number;
  tierra: number;
  total: number;
};

export type ViajeroAstral = {
  id: number;
  nombre: string;
  imagenUrl: string;
  poderMaximo: EnergiaElemental;
  poderDisponible: EnergiaElemental;
};

export default function ListaViajerosAstrales() {
  const [viajeros, setViajeros] = useState<ViajeroAstral[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchViajeros = async () => {
      try {
        const response = await fetch("http://localhost:8080/viajero-astral", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const data: ViajeroAstral[] = await response.json();
        setViajeros(data);
      } catch (error) {
        console.error("Error obteniendo viajeros", error);
      } finally {
        setLoading(false);
      }
    };

    fetchViajeros();
  }, []);

  if (loading) return <p>Cargando viajeros...</p>;

  return (
    <ul className="flex flex-col gap-3">
      {viajeros.map((v) => (
        <li
          key={v.id}
          className="border border-purple-700 rounded-2xl bg-[#160427] p-3 flex items-center justify-between"
        >
          <CardViajeroAstral 
              viajero={v}
          />
        </li>
      ))}
    </ul>
  );
}

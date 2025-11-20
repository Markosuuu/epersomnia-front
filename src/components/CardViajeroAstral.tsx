import { useLocation } from "wouter";

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

type Prop = {
  viajero: ViajeroAstral;
};

export default function CardViajeroAstral({ viajero }: Prop) {
  const [, setLocation] = useLocation();

  const handleClick = () => {
    localStorage.setItem("viajeroSeleccionadoId", String(viajero.id));
    
    setLocation(`/manifestar-avatar/${viajero.id}`);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="flex items-center gap-3 w-full cursor-pointer"
      >
        <img src={viajero.imagenUrl} alt={`image_${viajero.nombre}`} className="w-20 h-20 bg-gray-300 rounded-sm" />
        <h3 className="ms-4 text-xl font-semibold">{viajero.nombre}</h3>
      </div>
    </>
  );
}
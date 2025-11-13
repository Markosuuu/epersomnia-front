import { useLocation } from "wouter";

type Prop = {
  nombreViajero: string;
};

export default function CardViajeroAstral({ nombreViajero }: Prop) {
  const [, setLocation] = useLocation();

  const handleClick = () => {
    localStorage.setItem("viajeroSeleccionado", nombreViajero); // Esto guarda el nombre del viajero en local

    setLocation(`/manifestar-avatar/${encodeURIComponent(nombreViajero)}`); // esto cambia la url, no mucho más
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="flex items-center gap-3 w-full cursor-pointer"
      >
        <img src="https://picsum.photos/200" alt={`image_${nombreViajero}`} className="w-20 h-20 bg-gray-300 rounded-sm" />
        <h3 className="ms-4 text-xl font-semibold">{nombreViajero}</h3>
      </div>
    </>
  );
}
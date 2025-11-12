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
        className="card-viajero-astral items-center cursor-pointer"
      >
        <img src="https://picsum.photos/200" alt={`image_${nombreViajero}`} />
        <h3 className="ms-4 text-xl font-semibold">{nombreViajero}</h3>
      </div>
    </>
  );
}

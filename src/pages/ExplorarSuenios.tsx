import GrafoSuenios from "../components/GrafoSuenios";
import { useEffect, useState } from "react";
import TarjetaAvatar from "../components/TarjetaAvatar";
import PanelEventos from "../components/PanelEventos";

export default function ExplorarSuenios() {
  const [suenios, setSuenios] = useState([]);
  const [conexiones, setConexiones] = useState([]);
  const [avatares, setAvatares] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/sueño`)
      .then((res) => res.json())
      .then(setSuenios);

    fetch(`http://localhost:8080/sueño/conexiones`)
      .then((res) => res.json())
      .then(setConexiones);
    
    fetch(`http://localhost:8080/avatar`)
      .then((res) => res.json())
      .then(setAvatares);
  }, []);

  if (suenios.length === 0) return 
    <div className="m-auto"><p className="text-center">Cargando sueños...</p></div>

  return (
    <>
      <div style={{ padding: '20px' }}> {/* Contenedor principal para el layout */}
        <div className="flex h-full">
          
          <div className="w-81 flex-shrink-0"> 
            <TarjetaAvatar viajeros={avatares} />
          </div>
          
          <div className="flex-1 min-w-0 mx-4"> {/* Usa w-1/2 para darle 50% del ancho y centrar su contenido */}
            <GrafoSuenios suenios={suenios} conexiones={conexiones} />
          </div>
          
          <div className="w-80 flex-shrink-0"> 
           <PanelEventos></PanelEventos>
          </div>
          
        </div>
      </div>
    </>
  );
}

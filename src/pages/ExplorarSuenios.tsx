import GrafoSuenios from "../components/GrafoSuenios";
import { useEffect, useState } from "react";

export default function ExplorarSuenios() {
  const [suenios, setSuenios] = useState([]);
  const [conexiones, setConexiones] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/sueño`)
      .then((res) => res.json())
      .then(setSuenios);

    fetch(`http://localhost:8080/sueño/conexiones`)
      .then((res) => res.json())
      .then(setConexiones);
  }, []);

  if (suenios.length === 0) return <p className="text-center">Cargando sueños...</p>;

  return (
    <>
      <GrafoSuenios suenios={suenios} conexiones={conexiones} />
    </>
  );
}

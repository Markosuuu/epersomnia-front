import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import AtributoElemental from "../components/AtributoElemental";

type PoderElemental = {
  fuego: number;
  agua: number;
  tierra: number;
  aire: number;
};

type Avatar = {
  id: number;
  aspecto: string;
  poderElemental: PoderElemental;
};

type ViajeroData = {
  id: number;
  nombre: string;
  energiaDisponible: number;
  avatares: Avatar[];
};

export default function ManifestarAvatar() {
  const [viajero, setViajero] = useState<ViajeroData | null>(null);
  const [aspecto, setAspecto] = useState("");
  const [stats, setStats] = useState<PoderElemental>({
    fuego: 1,
    agua: 1,
    tierra: 1,
    aire: 1,
  });
  const [energia, setEnergia] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const nombreViajero =
    localStorage.getItem("viajeroSeleccionado") || "<viajero>";

  // esto es para aparentar una carga
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setViajero({
        id: 1,
        nombre: nombreViajero,
        energiaDisponible: 28,
        avatares: [
          {
            id: 1,
            aspecto: "Depresión",
            poderElemental: { fuego: 2, agua: 3, tierra: 1, aire: 1 },
          },
        ],
      });
      setEnergia(28);
      setLoading(false);
    }, 800);
  }, [nombreViajero]);

  // Handlers
  const handleStatChange = (key: keyof PoderElemental, delta: number) => {
    if (!viajero) return;
    const newValue = stats[key] + delta;
    const totalChange = delta > 0 ? -1 : 1;

    // Esto controla que las stats no se vuelvan locas
    if (newValue < 1 || newValue > 8 || energia + totalChange < 0) return;

    setStats({ ...stats, [key]: newValue });
    setEnergia(energia + totalChange);
  };

  const handleReset = () => {
    setAspecto("");
    setStats({ fuego: 1, agua: 1, tierra: 1, aire: 1 });
    setEnergia(viajero ? viajero.energiaDisponible : 0);
  };

  const handleCrear = async () => {
    if (!aspecto.trim()) {
      setError("El campo 'Aspecto' es obligatorio.");
      return;
    }
    if (!viajero) return;

    setError(null);

    const body = {
      viajeroId: viajero.id,
      aspecto,
      imagenUrl: "https://picsum.photos/200", // temporal
      poderElemental: stats,
    };

    try {
      /* REEMPLAZAR CUANDO ESTÉ EL BACK
      const response = await fetch(`/avatar/viajero-astral/${viajero.id}/manifestar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const nuevoAvatar = await response.json();
      setViajero({ ...viajero, avatares: [...viajero.avatares, nuevoAvatar] });
      */

      // EJEMPLO PARA ESTAR CARGADO NOMÁS:
      const nuevoAvatar = { ...body, id: Date.now() };
      setViajero({
        ...viajero,
        avatares: [...viajero.avatares, nuevoAvatar as unknown as Avatar],
      });
      handleReset();
    } catch (err) {
      setError("Error al crear el avatar.");
    }
  };

  const handleIcon = (elem: string) => {
    switch (elem) {
      case "fuego":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              fill="#9c2914"
              d="M6 14q0 1.3.525 2.463t1.5 2.037Q8 18.375 8 18.275v-.225q0-.8.3-1.5t.875-1.275L12 12.5l2.825 2.775q.575.575.875 1.275t.3 1.5v.225q0 .1-.025.225q.975-.875 1.5-2.037T18 14q0-1.25-.462-2.363T16.2 9.65q-.5.325-1.05.488t-1.125.162q-1.55 0-2.688-1.025T10.026 6.75Q9.05 7.575 8.3 8.463t-1.263 1.8t-.774 1.862T6 14m6 1.3l-1.425 1.4q-.275.275-.425.625t-.15.725q0 .8.587 1.375T12 20t1.412-.575T14 18.05q0-.4-.15-.737t-.425-.613zM12 3v3.3q0 .85.588 1.425t1.437.575q.45 0 .838-.187t.687-.563L16 7q1.85 1.05 2.925 2.925T20 14q0 3.35-2.325 5.675T12 22t-5.675-2.325T4 14q0-3.225 2.162-6.125T12 3"
            />
          </svg>
        );
      case "agua":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              fill="#2d46af"
              d="M12 22q-3.425 0-5.712-2.35T4 13.8q0-1.55.7-3.1t1.75-2.975T8.725 5.05T11 2.875q.2-.2.463-.287T12 2.5t.538.088t.462.287q1.05.925 2.275 2.175t2.275 2.675T19.3 10.7t.7 3.1q0 3.5-2.287 5.85T12 22m0-2q2.6 0 4.3-1.763T18 13.8q0-1.825-1.513-4.125T12 4.65Q9.025 7.375 7.513 9.675T6 13.8q0 2.675 1.7 4.438T12 20"
            />
          </svg>
        );
      case "tierra":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              fill="#a66913"
              d="M2 22h20l-6-8l-5-2l-3-4H2zm2-2v-1.6l2 .65l9.025-3L18 20zm2-3.05l-2-.675V14.4l2 .65l3.95-1.3l2.4 1.075zM18.5 14l4.5-2V8l-4.5-1L16 9v3zM6 12.95l-2-.675V10h3l1.625 2.075zm12.8-1.275l-.8-.625v-1.1l1-.8l2 .45v1.1zM12 8l5-2V1l-5-1l-3 2v4zm.225-2.25L11 4.925v-1.85l1.425-.95L15 2.65v2z"
            />
          </svg>
        );

      case "aire":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              fill="#3cc66d"
              d="M11.5 20q-1.25 0-2.125-.875T8.5 17h2q0 .425.288.713T11.5 18t.713-.288T12.5 17t-.288-.712T11.5 16H2v-2h9.5q1.25 0 2.125.875T14.5 17t-.875 2.125T11.5 20M2 10V8h13.5q.65 0 1.075-.425T17 6.5t-.425-1.075T15.5 5t-1.075.425T14 6.5h-2q0-1.475 1.013-2.488T15.5 3t2.488 1.013T19 6.5t-1.012 2.488T15.5 10zm16.5 8v-2q.65 0 1.075-.425T20 14.5t-.425-1.075T18.5 13H2v-2h16.5q1.475 0 2.488 1.013T22 14.5t-1.012 2.488T18.5 18"
            />
          </svg>
        );
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-purple-300">
        <div>
          <p className="block">Cargando viajero...</p>
        </div>
        <div>
          <Spinner />
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0a0215] text-purple-200 flex flex-col items-center justify-center pb-10 overflow-x-hidden">
        <h1 className="text-2xl font-bold my-4 text-center tracking-wider">
          Torre de los sueños
        </h1>
        <div className="border-b border-purple-700 w-full mb-8 text-center" />
      <div className="max-w-5xl w-full p-6 rounded-2xl shadow-xl">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 justify-items-center">
          {/* COLUMNA IZQUIERDA */}
          <div className="w-full max-w-[350px]">
            <h1 className="text-2xl font-bold mb-4 text-center tracking-wider">
              Manifestar nuevo avatar
            </h1>

            <div className="border border-purple-700 rounded-2xl p-6 bg-[#160427]">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-gray-300 rounded-sm" />
                <span className="text-lg tracking-wide">
                  {viajero ? viajero.nombre : "<viajero>"}
                </span>
              </div>

              <label className="font-semibold text-lg">Aspecto</label>
              <br />
              <input
                type="text"
                value={aspecto}
                onChange={(e) => setAspecto(e.target.value)}
                className="p-2 rounded-lg bg-white/10 border border-white/30 text-white placeholder-white/70 focus:outline-none"
                placeholder="Ej: Valentía"
                required
              />

              <div className="mt-4 mb-2 text-sm">
                <p className="font-medium">
                  Puntos disponibles:{" "}
                  <span className="text-purple-200 font-bold">{energia}</span>
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 text-center mb-4">
                {Object.entries(stats).map(([key, value]) => (
                  <AtributoElemental
                    key={key}
                    nombre={key}
                    valor={value}
                    onIncrement={() =>
                      handleStatChange(key as keyof PoderElemental, +1)
                    }
                    onDecrement={() =>
                      handleStatChange(key as keyof PoderElemental, -1)
                    }
                  />
                ))}
              </div>

              <div className="flex flex-col gap-3 mt-6">
                <button
                  type="submit"
                  onClick={handleCrear}
                  className="bg-purple-600 hover:bg-purple-700 transition font-semibold py-2 px-4 rounded-xl cursor-pointer"
                >
                  Crear
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-transparent border border-purple-400 hover:bg-purple-500/20 transition font-semibold py-2 px-4 rounded-xl cursor-pointer"
                >
                  Resetear
                </button>
              </div>

              {error && (
                <p className="text-red-400 text-center text-sm mt-3">{error}</p>
              )}
            </div>
          </div>

          {/* COLUMNA DERECHA */}
          {viajero?.avatares?.length ? (
            <div className="w-full max-w-[350px] mt-10 lg:mt-0">
              <h1 className="text-2xl font-bold mb-4 text-center tracking-widest">
                Avatares creados
              </h1>
              <ul className="space-y-4">
                {viajero.avatares.map((a) => (
                  <li
                    key={a.id}
                    className="border border-purple-700 rounded-2xl bg-[#160427] p-3 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-300 rounded-sm" />
                      <span>{a.aspecto}</span>
                    </div>
                    <div className="flex gap-2">
                      {Object.entries(a.poderElemental).map(([key, val]) => (
                        <div key={key} className="flex items-center gap-1">
                          <div className="w-4 h-4">{handleIcon(key)}</div>
                          <span className="text-sm">{val}</span>
                        </div>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

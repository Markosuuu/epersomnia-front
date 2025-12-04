import { useEffect, useState } from "react";

type TopAsesinoResponse = {
  cantidadAsesinatos: number;
  avatar_aspecto: string;
};

type MasExploradorResponse = {
  cantidadMovimientos: number;
  avatar_aspecto: string;
};

type MasPruebasResponse = {
  cantidadPruebas: number;
  avatar_aspecto: string;
};

type MasDueladorResponse = {
  cant_duelos: number;
  avatar_aspecto: string;
};

type MasRetadorResponse = {
  cant_retos: number;
  avatar_aspecto: string;
};

type MenosVivoResponse = {
  avatar_aspecto: string;
};

type PrimerVaradoResponse = {
  avatar_aspecto: string;
};

export default function ModalGanador({ isOpen, ganador }: any) {
  const [stats, setStats] = useState<{
    asesino: TopAsesinoResponse | null;
    explorador: MasExploradorResponse | null;
    pruebas: MasPruebasResponse | null;
    duelador: MasDueladorResponse | null;
    retador: MasRetadorResponse | null;
    muerto: MenosVivoResponse | null;
    varado: PrimerVaradoResponse | null;
  }>({
    asesino: null,
    explorador: null,
    pruebas: null,
    duelador: null,
    retador: null,
    muerto: null,
    varado: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- FETCHER GENÉRICO ---
  const fetchJson = async <T,>(url: string, errorMsg: string): Promise<T | null> => {
    try {
      const resp = await fetch(url);
      if (!resp.ok) throw new Error(errorMsg);
      return await resp.json();
    } catch (err: any) {
      setError(err.message);
      return null;
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    setLoading(true);
    setError(null);

const loadStats = async () => {
      const [asesino, explorador, pruebas, duelador, retador, muerto, varado] = await Promise.all([
        fetchJson<TopAsesinoResponse>("http://localhost:8080/firebase/top-asesino", "Error consultando top asesino"),
        fetchJson<MasExploradorResponse>("http://localhost:8080/firebase/mas-explorador", "Error consultando más explorador"),
        fetchJson<MasPruebasResponse>("http://localhost:8080/firebase/mas-pruebas-superadas", "Error consultando más pruebas"),
        fetchJson<MasDueladorResponse>("http://localhost:8080/firebase/mas-duelador", "Error consultando más pruebas"),
        fetchJson<MasRetadorResponse>("http://localhost:8080/firebase/mas-retador", "Error consultando más pruebas"),
        fetchJson<MenosVivoResponse>("http://localhost:8080/firebase/menos-vivio", "Error consultando más pruebas"),
        fetchJson<PrimerVaradoResponse>("http://localhost:8080/firebase/primer-varado", "Error consultando más pruebas"),
      ]);

      setStats({ asesino, explorador, pruebas, duelador, retador, muerto, varado});
      setLoading(false);
    };

    loadStats();
  }, [isOpen]);

  if (!isOpen) return null;

  const { asesino, explorador, pruebas, duelador, retador, muerto, varado } = stats;

  return (
    <div className="fixed inset-0 bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white rounded-xl shadow-2xl p-10 w-[60vw] h-[90vh] flex flex-col justify-between">

        {/* TITULO */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">🏆 ¡Tenemos un ganador! 🏆</h1>
          <h2 className="text-3xl text-yellow-400"><strong>{ganador}</strong></h2>
        </div>

        <div className="flex-1 mt-10 bg-gray-800 bg-opacity-40 rounded-lg p-6 overflow-y-auto">

          {loading && (
            <div className="text-center text-lg text-gray-300">
              Cargando estadísticas...
            </div>
          )}

          {!loading && (
            <>
              {asesino && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-amber-400">🔪 Asesino serial de la torre</h3>
                  <div className="bg-cyan-700 bg-opacity-50 p-4 rounded-lg">
                    🩸🔪 <strong>{asesino.avatar_aspecto}</strong> es el carnicero de la torre acabando con {asesino.cantidadAsesinatos} avatares por su camino
                  </div>
                </div>
              )}

              {explorador && (
                <div className="space-y-4 mt-10">
                  <h3 className="text-2xl font-semibold text-amber-400">🗺️ Explorador errante</h3>
                  <div className="bg-cyan-700 bg-opacity-50 p-4 rounded-lg">
                    🥾 <strong>{explorador.avatar_aspecto}</strong> es el avatar que más conoce el mundo, visitando {explorador.cantidadMovimientos} sueños en su viaje
                  </div>
                </div>
              )}

              {pruebas && (
                <div className="space-y-4 mt-10">
                  <h3 className="text-2xl font-semibold text-amber-400">💪🏼 Superador de pruebas</h3>
                  <div className="bg-cyan-700 bg-opacity-50 p-4 rounded-lg">
                    💪🏼 <strong>{pruebas.avatar_aspecto}</strong> es el avatar que más desafios atravesó en la torre con un total de {pruebas.cantidadPruebas}
                  </div>
                </div>
              )}
              
              {duelador && (
                <div className="space-y-4 mt-10">
                  <h3 className="text-2xl font-semibold text-amber-400">⚔️ El duelista</h3>
                  <div className="bg-cyan-700 bg-opacity-50 p-4 rounded-lg">
                    ⚔️ <strong>{duelador.avatar_aspecto}</strong> es el avatar que más se paró de mano, enfrentandose a {duelador.cant_duelos}
                  </div>
                </div>
              )}
              
              {retador && (
                <div className="space-y-4 mt-10">
                  <h3 className="text-2xl font-semibold text-amber-400">🪓 El retador experimentado</h3>
                  <div className="bg-cyan-700 bg-opacity-50 p-4 rounded-lg">
                    🪓 <strong>{retador.avatar_aspecto}</strong> es el avatar que más desafió distintos avatares, indiferente de si perdió o ganó, batallando contra {retador.cant_retos} avatares en su camino
                  </div>
                </div>
              )}
              
              {muerto && (
                <div className="space-y-4 mt-10">
                  <h3 className="text-2xl font-semibold text-amber-400">💀 El primer fiambre</h3>
                  <div className="bg-cyan-700 bg-opacity-50 p-4 rounded-lg">
                    💀 <strong>{muerto.avatar_aspecto}</strong> es el avatar que menos pudo experimentar el viaje y la travesía en la torre
                  </div>
                </div>
              )}
              
              {varado && (
                <div className="space-y-4 mt-10">
                  <h3 className="text-2xl font-semibold text-amber-400">🐌 El extraviado</h3>
                  <div className="bg-cyan-700 bg-opacity-50 p-4 rounded-lg">
                    🐌 <strong>{varado.avatar_aspecto}</strong> es el avatar que no pudo continuar porque se quedó sin salida.
                  </div>
                </div>
              )}


            </>
          )}

          <div className="flex justify-center mt-10">
            <button
              className="bg-amber-600 hover:bg-amber-700 px-6 py-3 rounded-lg font-bold cursor-pointer"
              onClick={() => (window.location.href = "/")}
            >
              Reiniciar simulación
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

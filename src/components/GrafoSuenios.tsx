import ReactFlow, {
  Background,
  Controls
} from "reactflow";
import "reactflow/dist/style.css";

import CircleNode from "./CircleNode";

const nodeTypes = {
  circle: CircleNode,
};

// Funcion auxiliar para agrupar sueños por nivel
function agruparPorNivel(suenios: any[]) {
  const niveles: Record<number, any[]> = {};

  suenios.forEach((s) => {
    if (!niveles[s.nivel]) niveles[s.nivel] = [];
    niveles[s.nivel].push(s);
  });

  return niveles;
}

export default function GrafoSuenios({ suenios, conexiones }: any) {

  const niveles = agruparPorNivel(suenios);

  const nodes = suenios.map((s: any) => {
    const sueniosEnEseNivel = niveles[s.nivel];
    const indiceDentroDelNivel = sueniosEnEseNivel.findIndex((x) => x.id === s.id);

    const separacionX = 250;
    const separacionY = 320;

    const cantidadEnNivel = sueniosEnEseNivel.length;

    // Centro del nivel → desplazamiento negativo
    const offsetX = -((cantidadEnNivel - 1) * separacionX) / 2;

    return {
      id: s.id.toString(),
      type: "circle",

      position: {
        x: offsetX + indiceDentroDelNivel * separacionX,
        y: -s.nivel * separacionY,
      },

      data: {
        id: s.id, 
        nombreSuenio: s.nombre,
        cantidadDiamantes: s.cantidadFragmentosDisponibles || 0,
        cantidadPersonas: s.personas || 0 
      },
    };
  });

  const edges = conexiones.map((c: any) => ({
    id: `${c.origen}-${c.destino}`,
    source: c.origen.toString(),
    target: c.destino.toString(),
    label: `${c.costeDeLucidez}`,
    animated: true,
    labelStyle: {
      textTransform: 'uppercase',
      fontWeight: 'bold',
      fill: 'black',
      fontSize: '20px',
    },
    labelBgStyle: { 
      fill: 'rgba(32, 206, 177)',
    },
    labelBgPadding: [6, 4],
  }));

  return (
    <div style={{ width: "100%", height: "95vh" }}>
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

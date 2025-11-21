import ReactFlow, {
  Background,
  Controls
} from "reactflow";
import "reactflow/dist/style.css";

import CircleNode from "./CircleNode";

const nodeTypes = {
  circle: CircleNode,
};

function alinearNodosBidireccionales(
  nodes: any[],
  edges: any[]
) {
  const posiciones: Record<string, { y: number }> = {};

  edges.forEach((e) => {
    const reverse = edges.find(
      (r) => r.source === e.target && r.target === e.source
    );

    if (reverse) {
      posiciones[e.source] = { y: 0 };
      posiciones[e.target] = { y: 0 };
    }
  });

  return nodes.map((n) => ({
    ...n,
    position: {
      x: n.position.x,
      y: posiciones[n.id]?.y ?? n.position.y,
    },
  }));
}


export default function GrafoSuenios({ suenios, conexiones }: any) {
  // Transformación: Sueño → nodo reactflow
  const nodes = suenios.map((s: any) => ({
    id: s.id.toString(),
    type: "circle",
    position: { x: Math.random() * 800, y: Math.random() * 800 },
    data: { label: `${s.nombre}` },
  }));

  // Transformación: Conexion → edge reactflow
  const edges = conexiones.map((c: any) => ({
    id: `${c.origen}-${c.destino}`,
    source: c.origen.toString(),
    target: c.destino.toString(),
    label: `Costo: ${c.costeDeLucidez}`,
    animated: true
  }));

  const nodesAlineados = alinearNodosBidireccionales(nodes, edges);

  return (
    <div style={{ width: "100%", height: "600px" }}>
      <ReactFlow
        nodes={nodesAlineados}
        edges={edges}
        nodeTypes={nodeTypes}
      >
        <Background />
        <Controls />
        {/* <MiniMap /> */}
      </ReactFlow>
    </div>
  );
}

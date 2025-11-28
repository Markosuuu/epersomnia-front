import { Handle, Position } from "reactflow";

// Define la estructura de las propiedades que se esperan en 'data'
interface CircleNodeData {
  label: string; // Puede seguir existiendo, aunque usaremos nombreSuenio
  nombreSuenio: string;
  cantidadDiamantes: number;
  cantidadPersonas: number;
}

// Ahora el componente acepta un tipo de datos más específico
export default function CircleNode({ data }: { data: CircleNodeData }) {
  // Desestructurar las propiedades necesarias del objeto data
  const { nombreSuenio, cantidadDiamantes, cantidadPersonas } = data;

  // Generar los elementos de diamante (usando el ícono 💎)
  const diamantes = Array.from({ length: cantidadDiamantes }, (_, index) => (
    <span key={`diamante-${index}`} style={{ fontSize: '1em' }}>
      💎
    </span>
  ));

  // Generar los elementos de persona (usando un ícono simple o un div)
  // Aquí usaré un ícono de persona, ya que no tengo acceso al CSS de .persona-icon
  const personas = Array.from({ length: cantidadPersonas }, (_, index) => (
    <span key={`persona-${index}`} style={{ fontSize: '1.5em' }}>
      👤
    </span> // Usando un ícono Unicode (Persona)
  ));

  return (
    <div
      style={{
        width: 150, // Incrementado para acomodar más contenido
        height: 150,
        borderRadius: "50%",
        background: "linear-gradient(to bottom right, #260845, #160425)",
        border: "4px solid #a855f7",
        display: "flex",
        flexDirection: "column", // Para apilar el contenido verticalmente
        alignItems: "center",
        justifyContent: "space-between",
        padding: 8,
        margin: 12,
        fontWeight: "bold",
        color: "white",
        fontSize: 14,
        textAlign: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)", // Opcional: para mejor visualización
      }}
    >
      {/* Handles para las conexiones de React Flow */}
      <Handle type="source" style={{width: 10, height: 10, background: "white"}} position={Position.Top} />
      <Handle type="target" style={{width: 10, height: 10, background: "white"}} position={Position.Bottom} />
      
      {/* 💎 Fila de Diamantes */}
      <div style={{ display: 'flex', gap: '1px', marginTop: '4px', marginBottom: '2px', minHeight: '1.2em' }}>
        {diamantes}
      </div>

      {/* Nombre del Sueño */}
      <div style={{ margin: '5px 0', overflowWrap: 'break-word' }}>
        {nombreSuenio}
      </div>
      
      {/* 👤 Fila de Personas */}
      <div style={{ display: 'flex', gap: '5px', marginTop: '5px', minHeight: '1.2em' }}>
        {personas}
      </div>
      
    </div>
  );
}
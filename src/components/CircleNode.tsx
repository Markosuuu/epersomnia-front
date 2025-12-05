import { useEffect, useState } from "react";
import { Handle, Position } from "reactflow";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";

// Define la estructura de las propiedades que se esperan en 'data'
interface CircleNodeData {
  id: number; // Puede seguir existiendo, aunque usaremos nombreSuenio
  nombreSuenio: string;
  cantidadDiamantes: number;
  cantidadPersonas: number;
}

// Ahora el componente acepta un tipo de datos más específico
export default function CircleNode({ data }: { data: CircleNodeData }) {
  // Desestructurar las propiedades necesarias del objeto data
  const { nombreSuenio, cantidadDiamantes } = data;
  const [personasActuales, setPersonasActuales] = useState(
    data.cantidadPersonas || 0
  );
  const [fragmentosActuales, setFragmentosActuales] = useState(
    data.cantidadDiamantes || 0
  );

  const handleArriboANodo = () => setPersonasActuales((p) => p + 1);
  const handlePartidaDeNodo = () =>
    setPersonasActuales((p) => Math.max(0, p - 1));

  const handleQuitarFragmento = () =>
    setFragmentosActuales((p) => Math.max(0, p - 1));

  useEffect(() => {
    const eventosRef = collection(db, "avatar-log");

    const queryGenteQueLlega = query(
      eventosRef,
      where("tipo", "==", "Movimiento"),
      where("sueñoDestinoId", "==", data.id)
    );

    const queryGenteQueSeVa = query(
      eventosRef,
      where("tipo", "==", "Movimiento"),
      where("sueñoOrigenId", "==", data.id)
    );

    const queryObtenerFragmento = query(
      eventosRef,
      where("tipo", "==", "Obtener Fragmento"),
      where("sueñoId", "==", data.id)
    );

    const queryObtenerCorazon = query(
      eventosRef, 
      where("tipo", "==", "Obtuvo El Corazón"),
      where("sueñoId", "==", data.id)
    );

    const queryMurioUnAvatar = query(
      eventosRef,
      where("perecioElPerdedor", "==", true),
      where("sueñoId", "==", data.id)
    );

    const unsubscribers: (() => void)[] = [];

    const unsubscribeArribos = onSnapshot(queryGenteQueLlega, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type == "added") {
          handleArriboANodo();
        }
      });
    });
    unsubscribers.push(unsubscribeArribos);

    const unsubscribePartidas = onSnapshot(queryGenteQueSeVa, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type == "added") {
          handlePartidaDeNodo();
        }
      });
    });
    unsubscribers.push(unsubscribePartidas);

    const unsubscribeFragmentos = onSnapshot(
      queryObtenerFragmento,
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type == "added") {
            handleQuitarFragmento();
          }
        });
      }
    );
    unsubscribers.push(unsubscribeFragmentos);

    const unsubscribeVida = onSnapshot(queryMurioUnAvatar, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type == "added") {
          handlePartidaDeNodo();
        }
      });
    });
    unsubscribers.push(unsubscribeVida);

  const unsubscribeCorazon = onSnapshot(queryObtenerCorazon, (snapshot) => {
    snapshot.docChanges().forEach(change => {
      if (change.type == ("added")) {
        handleQuitarFragmento();
      }
    })
  })
  unsubscribers.push(unsubscribeCorazon);

  return () => unsubscribers.forEach(unsub => unsub());
}, [data.id]); // Depende del ID del nodo

  // Generar los elementos de diamante (usando el ícono 💎)
  const diamantes = Array.from({ length: fragmentosActuales }, (_, index) => (
    <span
      key={`diamante-${index}`}
      style={{
        fontSize: "1.5em",
      }}
    >
      💎
    </span>
  ));

  // Generar los elementos de persona (usando un ícono simple o un div)
  // Aquí usaré un ícono de persona, ya que no tengo acceso al CSS de .persona-icon
  const personas = Array.from({ length: personasActuales }, (_, index) => (
    <span
      key={`persona-${index}`}
      style={{
        fontSize: "1.3em",
        background: "#fab31aff",
        border: "2px solid #260845",
        borderRadius: "50%",
      }}
    >
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
        border: "4px solid #470783ff",
        display: "flex",
        flexDirection: "column", // Para apilar el contenido verticalmente
        alignItems: "center",
        justifyContent: "space-between",
        padding: 8,
        margin: 25,
        fontWeight: "bold",
        color: "white",
        textTransform: "uppercase",
        fontSize: 20,
        textAlign: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)", // Opcional: para mejor visualización
      }}
    >
      {/* Handles para las conexiones de React Flow */}
      <Handle
        type="source"
        style={{ width: 10, height: 10, background: "white" }}
        position={Position.Top}
      />
      <Handle
        type="target"
        style={{ width: 10, height: 10, background: "white" }}
        position={Position.Bottom}
      />

      {/* 💎 Fila de Diamantes */}
      <div
        style={{
          display: "flex",
          gap: "1px",
          marginTop: "-35px",
          marginBottom: "0px",
          minHeight: "1.5em",
        }}
      >
        {diamantes}
      </div>

      {/* Nombre del Sueño */}
      <div style={{ marginTop: "0px", overflowWrap: "initial" }}>
        {nombreSuenio}
      </div>

      {/* 👤 Fila de Personas */}
      <div
        style={{
          display: "flex",
          gap: "5px",
          minHeight: "1.2em",
          marginBottom: "-25px",
        }}
      >
        {personas}
      </div>
    </div>
  );
}

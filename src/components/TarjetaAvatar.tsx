import React from 'react';

// --- 1. Definición de Tipos (Interfaces) ---

interface PoderElemental {
  fuego: number;
  aire: number;
  tierra: number;
  agua: number;
  total: number;
}

interface ViajeroAstral {
  id: number;
  aspecto: string;
  imagenUrl: string;
  poderElemental: PoderElemental;
  viajeroAstralId: number;
  viajeroAstralNombre: string;
  idsSueñosExplorados: number[];
  lucidezDisponible: number;
}

interface ListaViajerosAstralesProps {
  viajeros: ViajeroAstral[];
}

// --- 2. Función para manejar los Íconos SVG ---

const handleIcon = (elem: keyof Omit<PoderElemental, 'total'>) => {
  const iconStyle = { width: '20px', height: '20px', verticalAlign: 'middle', marginRight: '5px' };

  switch (elem) {
    case "fuego":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={iconStyle}>
          <path
            fill="#9c2914" // Rojo/Naranja oscuro para Fuego
            d="M6 14q0 1.3.525 2.463t1.5 2.037Q8 18.375 8 18.275v-.225q0-.8.3-1.5t.875-1.275L12 12.5l2.825 2.775q.575.575.875 1.275t.3 1.5v.225q0 .1-.025.225q.975-.875 1.5-2.037T18 14q0-1.25-.462-2.363T16.2 9.65q-.5.325-1.05.488t-1.125.162q-1.55 0-2.688-1.025T10.026 6.75Q9.05 7.575 8.3 8.463t-1.263 1.8t-.774 1.862T6 14m6 1.3l-1.425 1.4q-.275.275-.425.625t-.15.725q0 .8.587 1.375T12 20t1.412-.575T14 18.05q0-.4-.15-.737t-.425-.613zM12 3v3.3q0 .85.588 1.425t1.437.575q.45 0 .838-.187t.687-.563L16 7q1.85 1.05 2.925 2.925T20 14q0 3.35-2.325 5.675T12 22t-5.675-2.325T4 14q0-3.225 2.162-6.125T12 3"
          />
        </svg>
      );
    case "agua":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={iconStyle}>
          <path
            fill="#2d46af" // Azul oscuro para Agua
            d="M12 22q-3.425 0-5.712-2.35T4 13.8q0-1.55.7-3.1t1.75-2.975T8.725 5.05T11 2.875q.2-.2.463-.287T12 2.5t.538.088t.462.287q1.05.925 2.275 2.175t2.275 2.675T19.3 10.7t.7 3.1q0 3.5-2.287 5.85T12 22m0-2q2.6 0 4.3-1.763T18 13.8q0-1.825-1.513-4.125T12 4.65Q9.025 7.375 7.513 9.675T6 13.8q0 2.675 1.7 4.438T12 20"
          />
        </svg>
      );
    case "tierra":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={iconStyle}>
          <path
            fill="#a66913" // Marrón para Tierra
            d="M2 22h20l-6-8l-5-2l-3-4H2zm2-2v-1.6l2 .65l9.025-3L18 20zm2-3.05l-2-.675V14.4l2 .65l3.95-1.3l2.4 1.075zM18.5 14l4.5-2V8l-4.5-1L16 9v3zM6 12.95l-2-.675V10h3l1.625 2.075zm12.8-1.275l-.8-.625v-1.1l1-.8l2 .45v1.1zM12 8l5-2V1l-5-1l-3 2v4zm.225-2.25L11 4.925v-1.85l1.425-.95L15 2.65v2z"
          />
        </svg>
      );
    case "aire":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={iconStyle}>
          <path
            fill="#3cc66d" // Verde para Aire
            d="M11.5 20q-1.25 0-2.125-.875T8.5 17h2q0 .425.288.713T11.5 18t.713-.288T12.5 17t-.288-.712T11.5 16H2v-2h9.5q1.25 0 2.125.875T14.5 17t-.875 2.125T11.5 20M2 10V8h13.5q.65 0 1.075-.425T17 6.5t-.425-1.075T15.5 5t-1.075.425T14 6.5h-2q0-1.475 1.013-2.488T15.5 3t2.488 1.013T19 6.5t-1.012 2.488T15.5 10zm16.5 8v-2q.65 0 1.075-.425T20 14.5t-.425-1.075T18.5 13H2v-2h16.5q1.475 0 2.488 1.013T22 14.5t-1.012 2.488T18.5 18"
          />
        </svg>
      );
    default:
      return null;
  }
};

// --- 3. Componente Tarjeta Viajero ---

const TarjetaViajero: React.FC<{ data: ViajeroAstral }> = ({ data }) => {
  const { aspecto, viajeroAstralNombre, lucidezDisponible, poderElemental } = data;

  // Genera la representación de los poderes elementales
  const elementos = (Object.keys(ELEMENTO_EMOJIS) as (keyof Omit<PoderElemental, 'total'>)[])
    .map(elemento => {
      const valor = poderElemental[elemento];
      if (valor > 0) {
        return (
          <span key={elemento} style={{ margin: '2px 10px 0 0', display: 'flex', alignItems: 'center' }}>
            {handleIcon(elemento)} {/* ⬅️ Llamada a la función SVG */}
            {valor}
          </span>
        );
      }
      return null;
    })
    .filter(Boolean);

  // ... (El resto del return de TarjetaViajero es igual, usando los estilos definidos previamente)
  return (
    <div style={cardStyle}>
      <div style={contentStyle}>
        {/* Aspecto (Nombre) */}
        <h3 style={titleStyle}>{aspecto}</h3>
        
        {/* Nombre del Viajero Astral (Subtítulo) */}
        <p style={subtitleStyle}>Avatar de {viajeroAstralNombre}</p>

        {/* CONTENEDOR DE ELEMENTOS Y LUCIDEZ */}
        <div style={elementalContainerStyle}>
          
          {/* Elementos de Poder (Fuego, Agua, etc.) */}
          {elementos}
          
          {/* Lucidez (Ahora es un span y con más margen para separarlo) */}
          <span 
            style={{ 
              ...lucidezStyle, 
              // 🚀 Añadir margen para separarlo de los otros elementos
              marginLeft: '25px', 
              // Asegurar que no tenga el margin-top/bottom que tenía el <p> anterior
              margin: '0', 
            }}
          >
            ✨🧠 {lucidezDisponible}
          </span>
        </div>
        
      </div>
    </div>
  );
};

// --- 4. Componente Principal (Mapeador) ---

const ListaViajerosAstrales: React.FC<ListaViajerosAstralesProps> = ({ viajeros }) => {
  return (
    <div style={listContainerStyle}>
      {viajeros.map((viajero) => (
        <TarjetaViajero key={viajero.id} data={viajero} />
      ))}
    </div>
  );
};

export default ListaViajerosAstrales;

// --- 5. Estilos Básicos de CSS (igual que antes) ---
// (Mantenidos para la funcionalidad del ejemplo)
const listContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '.5em',
  padding: '.5em',
  backgroundColor: 'rgba(0, 0, 0, 0)',
  borderRadius: '8px',
  maxHeight: '80vh',
};
const cardStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  background: 'linear-gradient(to left, #4a177aff, #1f0535ff)',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  maxHeight: '9.5vh',
  color: 'white',
};
const contentStyle: React.CSSProperties = {
  padding: '1em 1em',
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
};
const titleStyle: React.CSSProperties = {
  margin: '0 0 1px 0',
  fontSize: '.85em',
  fontWeight: 'bold',
  color: 'white',
};
const subtitleStyle: React.CSSProperties = {
  margin: '0 0 1px 0',
  fontSize: '0.7em',
  fontStyle: 'italic',
  color: '#ccc',
};
const lucidezStyle: React.CSSProperties = {
  margin: '25px 0',
  padding: '1px 5px 1px 1px',
  fontSize: '1.1em',
  fontWeight: '600',
  color: '#19f1cdff',
  background: '#093f389d',
  borderRadius: '10%'
};
const elementalContainerStyle: React.CSSProperties = {
  margin: '0 8 0 0',
  fontSize: '0.85em',
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
};
// Nota: ELEMENTO_EMOJIS no se usa, pero se mantiene para la definición de tipos.
const ELEMENTO_EMOJIS: Record<keyof Omit<PoderElemental, 'total'>, string> = {
  fuego: '🔥',
  aire: '💨',
  tierra: '🌍',
  agua: '💧',
};

// --- 6. Ejemplo de Uso ---
/*
// En tu componente App.tsx o donde lo uses:
import viajerosData from './data.json'; // O donde tengas el array

function App() {
  return <ListaViajerosAstrales viajeros={viajerosData} />;
}
*/
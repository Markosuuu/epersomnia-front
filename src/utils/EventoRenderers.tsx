import React from "react";
import { 
  type EventoManifestarAvatar,
  type EventoMovimiento, 
  type EventoPruebaSuperada, 
  type EventoDuelo,
  type EventoObtenerFragmento,
  type EventoQuedoVarado,
  type EventoObtenerCorazon
} from "./Eventos";

export const RenderManifestarAvatar: React.FC<{ evento: EventoManifestarAvatar }> = ({ evento }) => {
  return (
    <>
      <span className="font-semibold text-[#19f1cdff] text-400 ">
        🧠 {evento.nombreViajero} 
      </span>
      <span className="ml-1 text-gray-200">
        ha manifestado a&nbsp; 
      </span>
      <span className="font-semibold text-[#dbed13ff] text-400">
        {evento.aspecto} 
      </span>
    </>
  );  
}

export const RenderMovimientoDeSueños: React.FC<{ evento: EventoMovimiento }> = ({ evento }) => {
  return (
    <>
      <span className="font-semibold text-[#19f1cdff] text-400 ">
        🏃 {evento.aspecto} 
      </span>
      <span className="ml-1 text-gray-200">
        se ha movido a&nbsp; 
      </span>
      <span className="font-semibold text-white-400 underline">
        {evento.nombreSueñoDestino} 
      </span>
    </>
  );  
}

export const RenderPuebaSuperada: React.FC<{ evento: EventoPruebaSuperada }> = ({ evento }) => {
  return (
    <>
      <span className="font-semibold text-[#e1f016ff] text-400 ">
        💪 {evento.aspecto} 
      </span>
      <span className="ml-1 text-gray-200">
        ha superado la prueba&nbsp; 
      </span>
      <span className="font-semibold text-white-400 italic">
        {evento.nombrePrueba} 
      </span>
    </>
  );  
}

export const RenderDuelo: React.FC<{ evento: EventoDuelo }> = ({ evento }) => {
  
  const { 
    aspecto, 
    aspectoDesafiado, 
    fueGanador, 
    perecioElPerdedor 
  } = evento;

  if (perecioElPerdedor && fueGanador) {
    return (
      <>
        <span className="font-semibold text-[#fc4c00ff] text-400 ">
          💀 {aspecto}
        </span>
        <span className="ml-1 text-gray-200">
          atacó a&nbsp; 
        </span>
        <span className="font-semibold text-[#fc4c00ff] text-400">
          {aspectoDesafiado} 
        </span>
        <span className="ml-1 text-gray-200">
          y lo mató!; 
        </span>
      </>
    );
  } 

  if (perecioElPerdedor && !fueGanador) {
    return (
      <>
        <span className="font-semibold text-[#fc4c00ff] text-400 ">
          ☠️ {aspecto}
        </span>
        <span className="ml-1 text-gray-200">
          se murio por agitarsela a&nbsp; 
        </span>
        <span className="font-semibold text-[#fc4c00ff] text-400">
          {aspectoDesafiado} 
        </span>
      </>
    );
  } 
  
  if (fueGanador && !perecioElPerdedor) {
    return (
      <>
        <span className="font-semibold text-[#fca419ff] text-400 ">
          ⚔️ {aspecto}
        </span>
        <span className="ml-1 text-gray-200">
          se desconoció con&nbsp; 
        </span>
        <span className="font-semibold text-[#fca419ff] text-400">
          {aspectoDesafiado} 
        </span>
        <span className="ml-1 text-gray-200">
          y ganó!👍; 
        </span>
      </>
    );
  }
  
    if (!fueGanador && !perecioElPerdedor) {
    return (
      <>
        <span className="font-semibold text-[#fca419ff] text-400 ">
          🛡️ {aspecto}
        </span>
        <span className="ml-1 text-gray-200">
          se desconoció con&nbsp; 
        </span>
        <span className="font-semibold text-[#fca419ff] text-400">
          {aspectoDesafiado} 
        </span>
        <span className="ml-1 text-gray-200">
          y perdió!👎; 
        </span>
      </>
    );
  }
};

export const RenderObtenerFragmento: React.FC<{ evento: EventoObtenerFragmento }> = ({ evento }) => {
  return (
    <>
      <span className="font-semibold text-[#00d2fcff] text-400 ">
        💎 {evento.aspecto} 
      </span>
      <span className="ml-1 text-gray-200">
        obtuvo un Fragmento de Alma en&nbsp; 
      </span>
      <span className="font-semibold text-white-400 italic">
        {evento.nombreSueño} 🙌
      </span>
    </>
  );  
}

export const RenderQuedoVarado: React.FC<{ evento: EventoQuedoVarado }> = ({ evento }) => {
  return (
    <>
      <span className="font-semibold text-[#8a5b6bff] text-400 ">
        🚫 {evento.aspecto} 
      </span>
      <span className="ml-1 text-gray-200">
        se quedo varado en&nbsp; 
      </span>
      <span className="font-semibold text-white-400 italic">
        {evento.nombreSueño} 🙌
      </span>
    </>
  );  
}

export const RenderObtenerCorazon: React.FC<{ evento: EventoObtenerCorazon }> = ({ evento }) => {
  return (
    <>
      <div className="bg-[#20ceb199] rounded-[8px] p-[3px] pl-[5px] pt-[9px] ">
        <span className="bg-[#470783ff] rounded-[5px] p-[2px] font-bold text-white-400 ">
          🏆 {evento.aspecto} 🏆
        </span>
        <span className="ml-1 font-bold text-black text-200">
          Obtuvo el Corazón de la Torre!!🫀 &nbsp; 
        </span>
      </div>
    </>
  );  
}





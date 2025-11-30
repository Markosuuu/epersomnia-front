import { Timestamp } from "firebase/firestore";

/**
 * Define la estructura de un documento de evento en Firestore.
 */
interface EventoBase {
  id: string;
  timestamp: Timestamp;
}

export interface EventoManifestarAvatar extends EventoBase{
  tipo:"Manifestar Avatar";
  viajeroId: number;
  nombreViajero: string;
  avatarId: number;
  aspecto: string;
  stats: {
    AIRE: number;
    FUEGO: number;
    AGUA: number;
    TIERRA: number;
  }
}

export interface EventoMovimiento extends EventoBase{
  tipo:"Movimiento";
  avatarId: number;
  sueñoId: number;
  aspecto: string;
  nombreSueñoDestino: string;
}

export interface EventoPruebaSuperada extends EventoBase{
  tipo:"Prueba Superada";
  avatarId: number;
  aspecto: string;
  nombrePrueba: string;
}

export interface EventoDuelo extends EventoBase{
  tipo:"Desconocimiento";
  avatarRetadorId: number;
  aspecto: string;
  avatarDesafiadoId: number;
  aspectoDesafiado: string;
  sueñoId: number;
  tiradaRetador: number;
  tiradaDesafiado: number;
  fueGanador: boolean;
  perecioElPerdedor: boolean;
}

export interface EventoObtenerFragmento extends EventoBase{
  tipo:"Obtener Fragmento";
  avatarId: number;
  aspecto: string;
  sueñoId: number;
  nombreSueño: string;
}

export interface EventoQuedoVarado extends EventoBase{
  tipo:"Quedo Varado";
  avatarId: number;
  aspecto: string;
  sueñoId: number;
  nombreSueño: string;
}

export interface EventoObtenerCorazon extends EventoBase{
  tipo:"Obtuvo El Corazón";
  avatarId: number;
  aspecto: string;
}

export type Evento = 
  | EventoMovimiento
  | EventoDuelo 
  | EventoManifestarAvatar 
  | EventoPruebaSuperada 
  | EventoObtenerFragmento 
  | EventoQuedoVarado 
  | EventoObtenerCorazon; 
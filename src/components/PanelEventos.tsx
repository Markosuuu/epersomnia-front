import { useEffect, useState, useRef } from "react";
import { collection, onSnapshot, query, orderBy, limit, type DocumentData } from "firebase/firestore";
import { type Evento } from "../utils/Eventos";
import { RenderDuelo, RenderManifestarAvatar, RenderMovimientoDeSueños, RenderObtenerCorazon, RenderObtenerFragmento, RenderPuebaSuperada, RenderQuedoVarado } from "../utils/EventoRenderers";
import { db } from "../firebaseConfig";

type RendererComponent = React.FC<{ evento: Evento }>;

const EventoRendererMap: Record<Evento["tipo"], RendererComponent> = {
  
  "Movimiento": RenderMovimientoDeSueños as RendererComponent,
  "Desconocimiento": RenderDuelo as RendererComponent,
  "Manifestar Avatar": RenderManifestarAvatar as RendererComponent, 
  "Prueba Superada": RenderPuebaSuperada as RendererComponent,       
  "Obtener Fragmento": RenderObtenerFragmento as RendererComponent, 
  "Quedo Varado": RenderQuedoVarado as RendererComponent,           
  "Obtuvo El Corazón": RenderObtenerCorazon as RendererComponent,     
};

const PanelEventos = () => {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const chatRef = useRef<HTMLDivElement>(null); 

  useEffect(() => {

    const eventosRef = collection(db, "avatar-log");

    const q = query(eventosRef, orderBy("timestamp", "desc"), limit(50)); 

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const eventosData: Evento[] = snapshot.docs.map((doc: DocumentData) => {
        const data = doc.data();

        return {
          id: doc.id,
          timestamp: data.timestamp,
          ...data
        } as Evento;
      });
      
      setEventos(eventosData.reverse()); 
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [eventos]);
  
  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-xl flex flex-col overflow-hidden">
      <div className="p-3 bg-gray-900 border-b border-gray-700">
        <h3 className="text-sm font-bold text-green-400">🚨 Monitor de Eventos</h3>
      </div>
      
      <div 
        ref={chatRef} 
        className="flex-grow p-3 space-y-2 overflow-y-auto custom-scrollbar"
        style={{ height: '70vh' }}
      >
        {eventos.map((evento) => {
          const Renderer = EventoRendererMap[evento.tipo];

          // Manejo de error si el tipo de evento no existe
          if (!Renderer) {
            return (
              <div key={evento.id} className="text-sm text-red-400">
                [ERROR] Tipo de evento desconocido: {evento.tipo}
              </div>
          );
          }

          return (
              <div className="text-sm">
                  <Renderer evento={evento} />
              </div>
          );
      })}

        {eventos.length === 0 && (
            <p className="text-center text-gray-500 py-4">Esperando eventos de la simulación...</p>
        )}
      </div>
    </div>
  );
};

export default PanelEventos;
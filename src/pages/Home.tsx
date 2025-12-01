import React, { useEffect, useState, type FC } from 'react';
import ExplorarSuenios from './ExplorarSuenios'; // Importa el componente que se cargará al iniciar

// --- Función de Utilidad: Reintentos con Retroceso Exponencial ---
/**
 * Intenta hacer un fetch a la URL dada hasta maxRetries veces,
 * esperando un tiempo progresivamente mayor entre cada intento fallido.
 * @param url La URL a la que hacer la petición.
 * @param options Opciones de la petición fetch.
 * @param maxRetries Número máximo de reintentos.
 * @param delay Retraso inicial en ms antes de los reintentos.
 * @returns La respuesta exitosa de la petición.
 */
const retryFetch = async (url: string, options: RequestInit, maxRetries = 5, delay = 500): Promise<Response> => {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                // Lanza un error si el estado HTTP no es 2xx
                throw new Error(`Error HTTP! Estado: ${response.status}`);
            }
            return response;
        } catch (error: any) {
            console.warn(`[REINTENTO ${i + 1}/${maxRetries}] Fallo al conectar: ${error.message}. Reintentando en ${delay * Math.pow(2, i)}ms...`);
            if (i === maxRetries - 1) {
                // Si el último reintento falla, lanza el error para ser capturado en el useEffect
                throw new Error("Fallo al conectar después de múltiples reintentos.");
            }
            // Espera con retroceso exponencial
            await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
        }
    }
    // Esto es solo para satisfacer el requisito de Promise<Response> de TS,
    // pero el bucle garantiza que se lanza un error si falla.
    throw new Error("Fallo inesperado del reintento de fetch.");
};

// Define los tipos de vista para un mejor control de estado
type ViewState = 'welcome' | 'explorar-suenios';

// Componente de Bienvenida
const Home: FC = () => {
    // Estado para manejar la carga (opcional, pero útil para feedback)
    const [isLoading, setIsLoading] = useState<boolean>(true);
    // Estado para la simulación de navegación (cambiar de componente sin recargar)
    const [view, setView] = useState<ViewState>('welcome');

    // 1. Efecto que se ejecuta solo una vez al cargar el componente
    useEffect(() => {
        const resetSimulation = async () => {
            try {
                // Envía el POST request al endpoint de reseteo, usando el mecanismo de reintento
                await retryFetch('http://localhost:8080/servicio/reset', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    // No es necesario enviar un body, pero se incluye por si acaso
                    body: JSON.stringify({}),
                });
                console.log("Servicio reseteado con éxito.");
            } catch (error) {
                // Si todos los reintentos fallan, el error se captura aquí.
                console.error("Error al resetear el servicio:", error);
                // Si falla, el botón de "Empezar Simulación" podría permanecer deshabilitado o mostrar un error.
            } finally {
                setIsLoading(false);
            }
        };

        resetSimulation();
    }, []);

    // 2. Función para manejar la redirección (cambio de vista)
    const handleStartSimulation = (): void => {
        // Cambiamos el estado de la vista para renderizar ExplorarSuenios
        setView('explorar-suenios');
    };

    // 3. Manejador de Vistas (Simulación de Router)
    if (view === 'explorar-suenios') {
        // Renderiza el componente ExplorarSuenios
        return <ExplorarSuenios />;
    }
    
    // Contenedor principal de Bienvenida
    return (
        <div 
            className="relative flex flex-col items-center justify-center h-screen w-full" 
            style={{ 
                // Gradiente de fondo actualizado a un color más oscuro
                backgroundImage: 'linear-gradient(to bottom, #260845, #0e021a)',
            }}
        >
            {/* Contenedor de la Leyenda de Producción */}
            <div className="absolute top-8 flex flex-col items-center text-white">
                {/* Línea 1: "una producción de" */}
                <p className="
                    text-base font-semibold italic opacity-90
                    /* Italica, no tan gordito y tamaño base */
                ">
                    una producción de
                </p>
                {/* Línea 2: "😿mEPERSdon as¿" */}
                <p 
                    className="
                        text-xl font-extrabold not-italic mt-[-4px]
                        /* Se mantiene negrita, no itálica, y se usa estilo inline para mayor espaciado */
                    "
                    style={{ letterSpacing: '0.4em' }}
                >
                    😿mEPERSdon as¿
                </p>
            </div>

            {/* Título Central */}
            <h1 className="
                text-4xl md:text-5xl font-bold text-white mb-10 tracking-wider
            ">
                Bienvenido a la Torre de los Sueños
            </h1>

            {/* Mensaje de Carga (mientras se resetea el servicio) */}
            {isLoading && (
                <p className="text-white text-xl mb-6 opacity-70">
                    Preparando la simulación...
                </p>
            )}

            {/* Botón de Empezar Simulación */}
            <button
                onClick={handleStartSimulation}
                disabled={isLoading}
                className={`
                    px-10 py-4 text-xl font-semibold rounded-xl transition duration-300 transform
                    shadow-2xl hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus:ring-4 
                    focus:ring-teal-400/50 
                    ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-teal-500/50'}
                `}
                style={{
                    backgroundColor: 'rgba(32, 206, 177)', // Color del Botón: Teal brillante
                    color: '#160425',                       // Color del Texto: Negro oscuro
                }}
            >
                {isLoading ? 'Reseteando...' : 'Empezar Simulación'}
            </button>
        </div>
    );
};

export default Home;
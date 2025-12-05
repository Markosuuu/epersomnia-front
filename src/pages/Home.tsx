import { useEffect, useState, useRef, type FC } from 'react';
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
const retryFetch = async (url: string, options: RequestInit, maxRetries = 1, delay = 500): Promise<Response> => {
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
    const isResetExecuted = useRef(false);
    // Estado para manejar la carga (opcional, pero útil para feedback)
    const [isLoading, setIsLoading] = useState<boolean>(true);
    // Estado para la simulación de navegación (cambiar de componente sin recargar)
    const [view, setView] = useState<ViewState>('welcome');

    // --- 1. Lógica de Reset (se mantiene para la inicialización) ---
    useEffect(() => {
        if (isResetExecuted.current) {
            return;
        }

        const resetSimulation = async () => {
            try {
                // Aquí usamos retryFetch porque el reset es crítico para el estado inicial
                await retryFetch('http://localhost:8080/simulacion/reset', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({}),
                });
                console.log("Servicio reseteado con éxito.");
            } catch (error) {
                console.error("Error al resetear el servicio:", error);
            } finally {
                setIsLoading(false);
            }
        };

        resetSimulation();
        isResetExecuted.current = true;
    }, []);

    // --- 2. Función para manejar el inicio y la redirección (MODIFICADA) ---
    const handleStartSimulation = (): void => {
        
        // 1. Envía el POST request de "inicio" sin usar 'await'
        fetch('http://localhost:8080/simulacion/start', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        })
        .then(response => {
            // El .then() se ejecuta cuando el servidor recibe la solicitud
            // (incluso si la respuesta HTTP tarda), pero no bloquea la UI.
            if (!response.ok) {
                // Puedes registrar un error si el servidor responde con un estado 4xx/5xx
                console.warn(`[START] El servidor respondió con estado ${response.status} al intentar iniciar la simulación.`);
            }
            console.log("[START] Solicitud de inicio enviada.");
        })
        .catch(error => {
            // Captura errores de red (e.g., el servidor está caído)
            console.error("[START] Fallo de red al intentar iniciar la simulación:", error);
        });

        // 2. Cambia la vista INMEDIATAMENTE después de enviar la petición
        setView('explorar-suenios');
    };

    // --- 3. Manejador de Vistas ---
    if (view === 'explorar-suenios') {
        return <ExplorarSuenios />;
    }
    
    // --- Renderizado JSX (se mantiene sin cambios) ---
    return (
        <div 
            className="relative flex flex-col items-center justify-center h-screen w-full" 
            style={{ 
                backgroundImage: 'linear-gradient(to bottom, #260845, #0e021a)',
            }}
        >
            {/* ... Resto del JSX (Título, Producción, etc.) ... */}

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
                onClick={handleStartSimulation} // <-- Llama a la nueva función
                disabled={isLoading}
                className={`
                    px-10 py-4 text-xl font-semibold rounded-xl transition duration-300 transform
                    shadow-2xl hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus:ring-4 
                    focus:ring-teal-400/50 cursor-pointer
                    ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-teal-500/50'}
                `}
                style={{
                    backgroundColor: 'rgba(32, 206, 177)',
                    color: '#160425',
                }}
            >
                {isLoading ? 'Reseteando...' : 'Empezar Simulación'}
            </button>
        </div>
    );
};

export default Home;
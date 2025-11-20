import ListaViajerosAstrales from "../components/ListaViajerosAstrales";

/**
 * Este es el home... no hay más misterio xd
 */
export default function Home() {
  return (
    <>
      <div className="bg-[#0a0215] text-purple-200 flex flex-col items-center justify-center pb-10 overflow-x-hidden">
        <div className="mb-5 flex justify-center align-text-top">
          <h2 className="text-lg">¿A que viajero perteneces?</h2>
        </div>
        <div className="w-full max-w-[350px] mt-10 lg:mt-0">
          <ul className="space-y-4">
            <ListaViajerosAstrales></ListaViajerosAstrales>
          </ul>
        </div>
      </div>
    </>
  );
}

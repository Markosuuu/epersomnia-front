import { Link } from "wouter";
import ListaViajerosAstrales from "../components/ListaViajerosAstrales";

/**
 * Este es el home... no hay más misterio xd
 */
export default function Home() {
  return (
    <>
      <div className=" min-h-screen bg-[#0a0215] text-purple-200 flex flex-col items-center justify-center pb-10 overflow-x-hidden">
        <h1 className="text-2xl font-bold my-4 text-center tracking-wider">
          <Link to="/">Torre de los sueños</Link>
        </h1>
        <div className="border-b border-purple-700 w-full mb-8 text-center" />
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

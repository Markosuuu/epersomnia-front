import CardViajeroAstral from "../components/CardViajeroAstral";
// import Header from "../components/Header";

const grupos = [
  "Royaleros",
  "Epersnautas",
  "Javatares",
  "Suepersonicos",
  "Lenders",
  "Docentes",
];

/**
 * Este es el home... no hay más misterio xd
 */
export default function Home() {
  return (
    <>
      <div className=" min-h-screen bg-[#0a0215] text-purple-200 flex flex-col items-center justify-center pb-10 overflow-x-hidden">
      <h1 className="text-2xl font-bold my-4 text-center tracking-wider">
        Torre de los sueños
      </h1>
      <div className="border-b border-purple-700 w-full mb-8 text-center" />
        <div className="mb-5 flex justify-center">
          <h2 className="text-lg">¿A que viajero perteneces?</h2>
        </div>
        <div className="w-full max-w-[350px] mt-10 lg:mt-0">
          <ul className="space-y-4">
            {grupos.map((grupo) => (
              <li key={grupo} className="border border-purple-700 rounded-2xl bg-[#160427] p-3 flex items-center justify-between">
                <CardViajeroAstral nombreViajero={grupo} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

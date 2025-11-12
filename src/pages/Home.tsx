import CardViajeroAstral from "../components/CardViajeroAstral";
import Header from "../components/Header";

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
      <Header />
      <div className="list-viajero-astral">
        <div className="mb-5 flex justify-center">
          <h2 className="text-lg">¿A que viajero perteneces?</h2>
        </div>
        <div className="flex justify-center">
          <ul>
            {grupos.map((grupo) => (
              <li key={grupo} className="pb-5">
                <CardViajeroAstral nombreViajero={grupo} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

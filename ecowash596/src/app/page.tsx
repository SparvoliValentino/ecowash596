import TurnosDisponibles from "../componentes/componentePaginaInicial/componentePaginaInicial";
import InformacionLavadero from "../componentes/informacionLavadero/informacionLavadero"

// import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full bg-[#252525] min-h-screen">
      <div className="w-full max-w-[1500px] mx-auto flex flex-col gap-7">
        <div className="w-full border-b-4 border-b-[#FFEB3B] mt-10">
          <h2 className="text-5xl bangers-regular tracking-wider  text-white text-center my-3">Deja que tu auto refleje lo mejor de ti</h2>
        </div>
        <div className="w-full flex flex-col md:flex-row justify-evenly">
          <div className="w-full md:w-1/2 md:border-r-4 md:border-red-500">
            <TurnosDisponibles/>
          </div>
          <div className="w-full md:w-1/2">
            <InformacionLavadero/>
          </div>
        </div>
      </div>
    </div>
  );
}

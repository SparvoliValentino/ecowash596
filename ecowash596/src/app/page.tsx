import TurnosDisponibles from "../componentes/componentePaginaInicial/componentePaginaInicial";
// import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full bg-[#252525] min-h-screen">
      <div className="w-full max-w-[1500px] mx-auto flex flex-col gap-5">
        <div className="w-full border-b-2 border-b-red-500 my-5">
          <h2 className="text-2xl font-bold text-white text-center">Deja que tu auto refleje lo mejor de ti</h2>
        </div>
        <div className="w-full">
          <TurnosDisponibles/>
        </div>
      </div>
    </div>
  );
}

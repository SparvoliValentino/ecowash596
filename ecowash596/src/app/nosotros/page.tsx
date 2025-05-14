import Image from "next/image";
import camionetaLavada from "../../../public/Camioneta_Lavada.jpeg"
import galeria1 from "../../../public/galeriaNosotros1.jpeg"
import galeria2 from "../../../public/galeriaNosotros2.jpeg"

const nosotros = () => {
    return (
        <div className="bg-[#252525] text-white p-6">
            <div className="max-w-[1500px] mx-auto flex justify-center items-center flex-col">
                <div className="w-ful text-center flex flex-col justify-evenly items-center gap-5">
                    <h1 className="text-5xl font-bold text-[#FFEB3B]">¡Bienvenido a EcoWash 596!</h1>
                    <p className="text-xl">Tu auto, siempre impecable</p>
                    <button className="bg-red-500 text-white py-2 px-6 rounded-full hover:bg-red-600 transition">Reserva tu turno ahora</button>
                </div>

                <div className="mt-12 flex flex-col justify-center items-center gap-8">
                    <div className="w-full">
                        <h2 className="text-4xl font-bold text-[#FFEB3B] mb-4 text-center">¿Quiénes somos?</h2>
                        <p className="text-lg">
                            En EcoWash 596, nos apasiona el cuidado y mantenimiento de tu vehículo.
                            Desde nuestros inicios, hemos trabajado con dedicación para brindarte un servicio de calidad.
                        </p>
                    </div>
                    <Image src={camionetaLavada} alt="" className="rounded-xl shadow-lg w-[300px] h-[400px]"/>
                    {/* <img src={camionetaLavada} alt="Nuestro equipo" className="rounded-xl shadow-lg" /> */}
                </div>

                <div className="mt-12 w-full space-y-8">
                    <h2 className="text-4xl font-bold text-[#FFEB3B] text-center">Nuestros Valores</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                            <h3 className="text-2xl font-bold">🌱 Sostenibilidad</h3>
                            <p>Usamos productos amigables con el medio ambiente.</p>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                            <h3 className="text-2xl font-bold">🚗 Calidad Garantizada</h3>
                            <p>Cada auto recibe un cuidado premium.</p>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                            <h3 className="text-2xl font-bold">❤️ Atención Personalizada</h3>
                            <p>Nuestro equipo está aquí para servirte.</p>
                        </div>
                    </div>
                </div>

                <div className="mt-12 space-y-8">
                    <h2 className="text-4xl font-bold text-[#FFEB3B]">¿Por qué elegir EcoWash 596?</h2>
                    <ul className="space-y-2">
                        <li>🚀 Turnos rápidos y flexibles.</li>
                        <li>✅ Productos de alta calidad.</li>
                        <li>👨‍🔧 Personal capacitado.</li>
                        <li>🌐 Reserva en línea en segundos.</li>
                    </ul>
                </div>

                <div className="mt-12 space-y-8">
                    <h2 className="text-4xl font-bold text-[#FFEB3B] text-center">Nuestro trabajo en acción</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Image src={galeria1} alt="" className="rounded-lg shadow-md w-[250px] h-[300px]"/>
                        <Image src={galeria2} alt="" className="rounded-lg shadow-md w-[250px] h-[300px]"/>
                        <img src="URL_DE_IMAGEN_3" className="rounded-lg shadow-md" />
                        <img src="URL_DE_IMAGEN_4" className="rounded-lg shadow-md" />
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <h2 className="text-3xl font-bold">¿Listo para que tu auto luzca como nuevo?</h2>
                    <button className="bg-red-500 text-white py-2 px-6 rounded-full hover:bg-red-600 transition mt-4">Reserva tu turno ahora</button>
                </div>
            </div>
        </div>

    )
}

export default nosotros;
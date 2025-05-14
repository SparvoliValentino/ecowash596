import Image from "next/image";
import camionetaLavada from "../../../public/Camioneta_Lavada.jpeg"
import galeria1 from "../../../public/galeriaNosotros1.jpeg"
import galeria2 from "../../../public/galeriaNosotros2.jpeg"
import imageBackground from "../../../public/fondoNosotros.jpeg"

const nosotros = () => {
    return (
        <div className="bg-[#252525] text-white p-6">
            <div className="w-full flex justify-center items-center">
                <div className="relative w-full h-[400px]">
                    {/* Imagen de fondo */}
                    <Image
                        src={imageBackground}
                        alt="Fondo"
                        className="w-full h-full object-cover blur-xs mask-image"
                        fill
                        priority
                    />

                    {/* Capa de opacidad gris */}
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-transparent opacity-70 blur-xs"></div>

                    {/* Texto centrado */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                        <h1 className="text-4xl md:text-5xl bangers-regular text-center font-bold text-[#FFEB3B]">¡Bienvenido a EcoWash 596!</h1>
                        <p className="text-xl">Tu auto, siempre impecable</p>
                        <button className="bg-red-500 text-white py-2 px-6 rounded-full hover:bg-red-600 transition">Reserva tu turno ahora</button>
                    </div>
                </div>
            </div>
            <div className="max-w-[1500px] mx-auto flex justify-center items-center flex-col">
                <div className="w-full text-center flex flex-col justify-evenly items-center gap-5">
                    <div className="mt-12 w-full space-y-8">
                        <h2 className="text-4xl font-bold text-[#FFEB3B] text-center bangers-regular">Nuestros Valores</h2>
                        <div className="flex justify-evenly items-center md:flex-row flex-col gap-6">
                            <div className="bg-gray-800 p-4 rounded-lg shadow-md w-[300px]">
                                <h3 className="text-2xl font-bold">🌱 Sostenibilidad</h3>
                                <p>Usamos productos amigables con el medio ambiente.</p>
                            </div>
                            <div className="bg-gray-800 p-4 rounded-lg shadow-md w-[300px]">
                                <h3 className="text-2xl font-bold">🚗 Calidad Garantizada</h3>
                                <p>Cada auto recibe un cuidado premium.</p>
                            </div>
                            <div className="bg-gray-800 p-4 rounded-lg shadow-md w-[300px]">
                                <h3 className="text-2xl font-bold">❤️ Atención Personalizada</h3>
                                <p>Nuestro equipo está aquí para servirte.</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 space-y-8">
                        <h2 className="text-4xl font-bold text-[#FFEB3B] bangers-regular">¿Por qué elegir EcoWash 596?</h2>
                        <ul className="space-y-2">
                            <li>🚀 Turnos rápidos y flexibles.</li>
                            <li>✅ Productos de alta calidad.</li>
                            <li>👨‍🔧 Personal capacitado.</li>
                            <li>🌐 Reserva en línea en segundos.</li>
                        </ul>
                    </div>

                    <div className="mt-12 space-y-8">
                        <h2 className="text-4xl font-bold text-[#FFEB3B] text-center bangers-regular">Nuestro trabajo en acción</h2>
                        <div className="flex justify-evenly items-center gap-4">
                            <Image src={galeria1} alt="" className="rounded-lg shadow-md w-[150px] h-[250px] md:w-[250px] md:h-[300px]" />
                            <Image src={galeria2} alt="" className="rounded-lg shadow-md w-[150px] h-[250px] md:w-[250px] md:h-[300px]" />
                        </div>
                    </div>

                    <div className="mt-12 text-center">
                        <h2 className="text-3xl font-bold">¿Listo para que tu auto luzca como nuevo?</h2>
                        <button className="bg-red-500 text-white py-2 px-6 rounded-full hover:bg-red-600 transition mt-4">Reserva tu turno ahora</button>
                    </div>




                </div>

            </div>
        </div>

    )
}

export default nosotros;
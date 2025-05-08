import Image from "next/image"
import producto1 from "../../../public/producto1.png"
import producto2 from "../../../public/producto2.png"
import producto3 from "../../../public/producto3.png"
import producto4 from "../../../public/producto4.png"
import producto5 from "../../../public/producto5.png"
const lavados = () => {
    return (
        <div className="bg-[#252525] min-h-screen w-full">
            <div className="max-w-[1500px] mx-auto flex flex-col justify-center items-center p-4 gap-4">
                <h2 className="text-5xl bangers-regular tracking-wider  text-white text-center mt-5">Tipos de lavado</h2>
                <div className="flex justify-evenly gap-6">
                    <div className="relative w-1/2 mx-auto mt-6">
                        {/* Cinta superior */}
                        <div className="absolute anton-regular -top-4 left-1/2 -translate-x-1/2 -translate-y-2 bg-[#FFEB3B] border-2 border-[#FFEB3B] text-black text-3xl font-bold px-4 py-1 rounded-md shadow">
                            Basico
                        </div>

                        {/* Contenedor de información */}
                        <div className="border border-[#FFEB3B] rounded-lg p-6 text-center text-xl text-white flex flex-col gap-3 font-semibold leading-relaxed">
                            <h2 className="anton-regulars mt-3">¿Que incluye?</h2>
                            <p>Lavado de exterior</p>
                            <p>Aspirado</p>
                            <p>Limpieza y acondicionamiento interior</p>
                            <div className="text-center w-full border-t-2 border-[#FFEB3B]">
                                <h2 className="anton-regulars text-center">Precios</h2>
                            </div>
                            <div className="flex justify-evenly items-center">
                                <div className="flex flex-col justify-center items-center">
                                    <h2>Auto</h2>
                                    <p>$15.000</p>
                                </div>
                                <div className="flex flex-col justify-center items-center">
                                    <h2>Pick up</h2>
                                    <p>$16.000</p>
                                </div>
                                <div className="flex flex-col justify-center items-center">
                                    <h2>Camioneta</h2>
                                    <p>$20.000</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative  w-1/2  mx-auto mt-6">
                        {/* Cinta superior */}
                        <div className="absolute anton-regular -top-4 left-1/2 -translate-x-1/2 -translate-y-2 bg-red-500 border-2 border-red-500 text-black text-3xl font-bold px-4 py-1 rounded-md shadow">
                            Premium
                        </div>

                        {/* Contenedor de información */}
                        <div className="border border-red-500 rounded-lg p-6 text-center text-xl text-white flex flex-col gap-5 font-semibold leading-relaxed">
                            <h2 className="anton-regulars mt-3">¿Que incluye?</h2>
                            <p>Lavado con productos linea toxic shine</p>
                            <p>Limpieza con cera de interior, exterior revividor de cubiertas y sellador con repelencia al agua</p>
                            <div className="text-center w-full border-t-2 border-red-500">
                                <h2 className="anton-regulars text-center">Precios</h2>
                            </div>
                            <div className="flex justify-evenly items-center">
                                <div className="flex flex-col justify-center items-center">
                                    <h2>Auto</h2>
                                    <p>$20.000</p>
                                </div>
                                <div className="flex flex-col justify-center items-center">
                                    <h2>Pick up</h2>
                                    <p>$21.000</p>
                                </div>
                                <div className="flex flex-col justify-center items-center">
                                    <h2>Camioneta</h2>
                                    <p>$25.000</p>
                                </div>
                            </div>
                            <div className="text-center w-full border-t-2 border-red-500">
                                <h2 className="anton-regulars text-center">Productos que se utilizan</h2>
                            </div>
                            <div className="flex justify-evenly items-center">
                                <Image src={producto1} alt="toxic shine holy gloss" className="w-[80px] h-[180px]" />
                                <Image src={producto2} alt="toxic shine mistyc seal" className="w-[80px] h-[180px]" />
                                <Image src={producto3} alt="toxic shine energy spray cera" className="w-[80px] h-[180px]" />
                                <Image src={producto4} alt="toxic shine gelshine" className="w-[80px] h-[180px]" />
                                <Image src={producto5} alt="toxic shine steeltall" className="w-[80px] h-[180px]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default lavados
import Image from "next/image"
import logo from "../../../public/ecowashLogo1.png"
import Link from "next/link";
const Header = () => {
    return (
        <div className="w-full bg-[#252525]">
            <div className="max-w-[1500px] mx-auto flex flex-col gap-5">
                <div className="w-full flex justify-center items-center my-4">
                    <Image
                        src={logo}
                        alt=""
                        width={250}   // ✅ Ajusta el ancho del logo
                        height={100}  // ✅ Ajusta la altura del logo
                        className="object-contain" // ✅ Mantiene proporciones
                        priority  // ✅ Optimiza el renderizado
                    />
                </div>
                <div className="w-full">
                    <ul className="w-full flex justify-evenly items-center">
                        <Link href={"/lavados"} className="bg-white rounded-2xl p-3 font-bold inset-shadow-2xs text-black">Lavados</Link>
                        <Link href={"/"} className="bg-white rounded-2xl p-3 font-bold inset-shadow-2xs text-black">Turnos</Link>
                        <Link href={"/nosotros"} className="bg-white rounded-2xl p-3 font-bold inset-shadow-2xs text-black">Nosotros</Link>
                    </ul>
                </div>
            </div>
        </div>
    )
}


export default Header;
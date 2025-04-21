import Image from "next/image"
import logo from "../../../public/ecowashLogo.png"
const Header = ()=>{
    return(
        <div className="w-full bg-[#252525]">
            <div className="max-w-[1500px] mx-auto flex flex-col gap-4">
                <div className="w-full flex justify-center items-center">
                    <Image
                        src={logo}
                        alt=""
                    />
                </div>
                <div className="w-full">
                    <ul className="w-full flex justify-evenly items-center">
                        <li className="bg-white rounded-2xl p-3 font-bold inset-shadow-2xs">Lavados</li>
                        <li className="bg-white rounded-2xl p-3 font-bold inset-shadow-2xs">Turnos</li>
                        <li className="bg-white rounded-2xl p-3 font-bold inset-shadow-2xs">Nosotros</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}


export default Header;
import { faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const informacionLavadero = () => {

    const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

    const generateWhatsAppLink = () => {
        const encodedMessage = encodeURIComponent('Hola Ecowash! Quisieras hacerles una consulta!');
        return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    };

    return (
        <div className="flex flex-col justify-start items-center gap-5 h-full p-4">
            <h2 className="text-5xl text-white bangers-regular text-center font-bold mb-4">Informacion del lavadero</h2>
            <div className="relative w-[500px] mx-auto mt-6">
                {/* Cinta superior */}
                <div className="absolute bangers-regular -top-4 left-1/2 -translate-x-1/2 -translate-y-2 bg-[#FFEB3B] text-black text-3xl font-bold px-4 py-1 rounded-md shadow">
                    Ubicacion
                </div>

                {/* Contenedor de información */}
                <div className="border border-[#FFEB3B] rounded-xl p-6 text-center text-xl text-white font-semibold leading-relaxed">
                    <p>Leon Guruciaga 596</p>
                    <p>San nicolas de los arroyos</p>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3333.3500595710075!2d-60.23230772343982!3d-33.33580329165168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b76796c1ac1633%3A0x4176e8a83f91090!2sLe%C3%B3n%20Guruciaga%20596%2C%20B2900%20San%20Nicol%C3%A1s%20de%20Los%20Arroyos%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1745432105808!5m2!1ses!2sar"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full rounded-xl"
                    ></iframe>
                </div>
            </div>
            <div className="relative w-[500px] mx-auto mt-6">
                {/* Cinta superior */}
                <div className="absolute bangers-regular -top-4 left-1/2 -translate-x-1/2 -translate-y-2 bg-[#FFEB3B] text-black text-3xl font-bold px-4 py-1 rounded-md shadow">
                    Horarios
                </div>

                {/* Contenedor de información */}
                <div className="border border-[#FFEB3B] rounded-lg p-6 text-center text-xl text-white  font-semibold leading-relaxed">
                    <p>Lunes a sábados de 8:00 a 16:00hs</p>
                </div>
            </div>

            <div className="relative w-[500px] mx-auto mt-6">
                {/* Cinta superior */}
                <div className="absolute bangers-regular -top-4 left-1/2 -translate-x-1/2 -translate-y-2 bg-[#FFEB3B] text-black text-3xl font-bold px-4 py-1 rounded-md shadow">
                    Redes
                </div>

                {/* Contenedor de información */}
                <div className="border border-[#FFEB3B] rounded-lg p-6 text-center text-xl text-white  font-semibold leading-relaxed flex justify-evenly items-center">
                    <a href={generateWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faWhatsapp} className="text-green-500 size-[100px]" />
                    </a>
                    <a href="https://www.instagram.com/eco.wash596?igsh=a3lieDh4N2trcGY3" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faInstagram} className="text-pink-500 size-[100px]" />
                    </a>
                </div>
            </div>

            <h3 className="text-5xl text-white text-center bangers-regular font-bold mb-4">Tipos de lavado</h3>
            <Link href={"/lavados"} className="bg-red-500 w-1/2 p-3 text-xl font-semibold text-white border-2 border-[#FFEB3B] text-center rounded-lg hover:bg-red-700 hover:border-[#FFEB3B]">Explora nuestros lavados</Link>



        </div>
    )
}

export default informacionLavadero;
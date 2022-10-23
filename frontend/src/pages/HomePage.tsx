import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faMotorcycle, faHouse, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import gestiones from "../assets/gestiones.jpg";

interface Boxes {
    nombre: string,
    icono: IconDefinition
}

export const HomePage = () => {

    const boxes: Boxes[] = [
        {
            nombre: "Auto",
            icono: faCar
        },
        {
            nombre: "Moto",
            icono: faMotorcycle
        },
        {
            nombre: "Casa",
            icono: faHouse
        },
    ];

    return (
        <div className={`md:visible z-0`}>
            <div className="relative h-full">

                {/* Imagen Principal */}
                <img src={gestiones} className="brightness-90" />

                {/* Gestiones más simples */}
                <div className="lg:w-1/2 flex flex-col text-center items-center space-y-7 lg:space-y-10 mt-10 lg:absolute lg:top-10 lg:left-10 text-slate-800 lg:text-white">
                    <h3 className="text-2xl lg:text-5xl">TUS <span className="font-semibold">GESTIONES MÁS SIMPLES</span></h3>
                    <h2 className="text-base lg:text-3xl lg:font-light tracking-wide">Descargá tu póliza, aboná y solicitá auxilio mecánico desde la web.</h2>
                    <button className="border-veryLightBlue border-2 lg:hover:bg-veryLightBlue lg:hover:text-white lg:duration-500 lg:bg-white lg:border-0 text-slate-800 font-bold py-3 lg:py-4 px-2  w-1/3 rounded-full">
                        Ingresar
                    </button>
                </div>

                {/* Nuestros Seguros */}
                <div className="mt-10 bg-slate-300 md:bg-white py-10">
                    <h3 className="text-center text-4xl text-blue font-light">Nuestros Seguros</h3>
                    <div className="flex flex-col md:flex-row items-center md:justify-center my-10 md:my-20 space-y-8 md:space-y-0 md:space-x-8">
                        {boxes.map((box) => (
                            <div className="flex flex-col justify-center items-center w-1/2 md:w-1/4 py-6 space-y-3 bg-veryDarkBlue rounded-lg border border-gray-200 shadow-md cursor-pointer" key={box.nombre}>
                                <FontAwesomeIcon icon={box.icono} color="white" size="3x" />
                                <p className="font-normal text-gray-300">{box.nombre}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sucursales */}
                <div className="mt-10 md:mt-0 px-3 py-10 flex flex-col items-center space-y-10 md:bg-slate-200">
                    <h3 className="text-center text-2xl md:text-3xl text-veryDarkBlue w-full">Encontranos en la sucursal más cercana</h3>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7391.925281131781!2d-68.12605387563134!3d-38.83425320803212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x960a4bcf82f11559%3A0x41cd4611464dad9e!2sLa%20Perseverancia%20Seguros!5e0!3m2!1ses!2sar!4v1666474446321!5m2!1ses!2sar"
                        className="w-full h-72 md:w-3/4"
                    />
                </div>

            </div>
        </div>
    )
}

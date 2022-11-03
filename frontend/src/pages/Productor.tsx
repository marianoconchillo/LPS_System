import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPerson, faCircleInfo, faPlus, faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const Productor = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="container mx-auto py-12 md:pt-16 px-5 flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl text-darkBlue text-center w-full">Bienvenido Productor</h2>
            <hr className="my-8 h-px bg-veryLightBlue border w-full" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-y-8 md:gap-x-14">
                <div className="p-6 max-w-sm rounded-lg border shadow-md bg-veryDarkBlue border-gray-700 cursor-pointer">
                    <FontAwesomeIcon icon={faPerson} color="white" size="3x" className="mb-5 inline-block w-full" />
                    <h5 className="mb-2 text-2xl font-semibold tracking-tight text-white">Buscar Cliente</h5>
                    <p className="mb-3 font-normal text-gray-300">Utilizar el DNI del Cliente para obtener todos sus datos asociados.</p>
                </div>
                <NavLink to="/buscarPoliza">
                    <div className="p-6 max-w-sm rounded-lg border shadow-md bg-veryDarkBlue border-gray-700 cursor-pointer">
                        <FontAwesomeIcon icon={faCircleInfo} color="white" size="3x" className="mb-5 inline-block w-full" />
                        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-white">Buscar Póliza</h5>
                        <p className="mb-3 font-normal text-gray-300">Utilizar el DNI del Cliente para obtener los datos de sus pólizas.</p>
                    </div>
                </NavLink>
                <div className="p-6 max-w-sm rounded-lg border shadow-md bg-veryDarkBlue border-gray-700 cursor-pointer">
                    <FontAwesomeIcon icon={faPlus} color="white" size="3x" className="mb-5 inline-block w-full" />
                    <h5 className="mb-2 text-2xl font-semibold tracking-tight text-white">Registrar Cliente</h5>
                    <p className="mb-3 font-normal text-gray-300">Registrar un nuevo cliente en el sistema para luego asociarle una póliza.</p>
                </div>
                <NavLink to="/registrarPoliza">
                    <div className="p-6 max-w-sm rounded-lg border shadow-md bg-veryDarkBlue border-gray-700 cursor-pointer">
                        <FontAwesomeIcon icon={faFileCirclePlus} color="white" size="3x" className="mb-5 inline-block w-full" />
                        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-white">Registrar Póliza</h5>
                        <p className="mb-3 font-normal text-gray-300">Registrar una nueva póliza en el sistema (se necesitarán todos sus datos asociados).</p>
                    </div>
                </NavLink>
            </div>
        </div>
    )
}

export default Productor;
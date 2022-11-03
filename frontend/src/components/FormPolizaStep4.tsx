import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

export const FormPolizaStep4 = () => {

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log("SUBMIT");
    }

    return (
        <div className="space-y-4 md:space-y-6 py-10 px-12 flex flex-col items-center" onSubmit={handleSubmit}>
            <h3 className="text-lg font-light text-gray-900">Póliza registrada correctamente</h3>
            <FontAwesomeIcon icon={faCheck} size="5x" color="#365883" />
            <NavLink to="/productor" className="w-full flex justify-center">
                <button className="border-veryLightBlue border-2 text-slate-800 font-bold py-3 px-2  w-1/3">
                    Volver
                </button>
            </NavLink>
        </div>
    )
}

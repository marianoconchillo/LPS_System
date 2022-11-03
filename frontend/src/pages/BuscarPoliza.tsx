import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { DotWave } from '@uiball/loaders'
import { useForm } from "../hooks/useForm";
import { usePoliza } from "../hooks/usePoliza";
import { Table } from "../components/Table";

type FormFields = {
    dni: string,
}

const BuscarPoliza = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { state: form, onChange } = useForm<FormFields>({
        dni: ""
    });

    const { isLoading, getPolizaCliente, polizas, error } = usePoliza();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await getPolizaCliente(form.dni);
    }

    return (
        <div className="container mx-auto py-12 md:pt-16 px-5 flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl text-darkBlue text-center w-full">Buscar Póliza</h2>
            <hr className="my-8 h-px bg-veryLightBlue border w-full" />
            <section className="w-full flex flex-col items-center md:w-3/4 lg:w-1/2 mb-5">
                <form className="flex relative items-center justify-center w-3/4" onSubmit={handleSubmit}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} color="#365883" size="xl" className="absolute pl-4 left-0" />
                    <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block py-2.5 px-16 w-full"
                        placeholder="DNI del cliente..."
                        onChange={(value) => onChange(value.target.value, "dni")}
                    />
                </form>
            </section>
            {
                isLoading ? (<div className="my-10"><DotWave color="#1b3b62" /></div>) :
                    error ? (<div className="text-center text-red-600">{error.msg}</div>) :
                        polizas && (<div className="w-full"><Table polizas={polizas} /></div>)

            }
        </div>
    )
}

export default BuscarPoliza;
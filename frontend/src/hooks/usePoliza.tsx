import { useState } from "react"
import { DefaultService, Polizas, Cliente, ApiError } from "../../generated/index";

interface Error {
    msg: string;
}

export const usePoliza = () => {

    const [isLoading, setLoading] = useState<boolean>(false);
    const [polizas, setPolizas] = useState<Polizas>();
    const [error, setError] = useState<Error | null>();

    const getPolizaCliente = async (dni: string) => {
        try {
            setError(null);
            setLoading(true);

            const cliente: Cliente = await DefaultService.getApiClientes(dni);

            const poliza: Polizas = await DefaultService.getApiPolizasCliente(cliente._id);

            setPolizas(poliza);

        } catch (error) {
            if (error instanceof ApiError) {
                setError(error.body);
            } else {
                console.log(error)
            }
        } finally {
            setLoading(false);
        }
    }

    return { isLoading, getPolizaCliente, polizas, error }

}
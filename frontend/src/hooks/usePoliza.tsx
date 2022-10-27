import axios from "axios";
import { useState } from "react"
import { Cliente, Polizas } from "../interfaces/interfaces";

interface Error {
    msg: string;
}

export const usePoliza = () => {

    const [isLoading, setLoading] = useState(false);
    const [polizas, setPolizas] = useState<Polizas[]>();
    const [error, setError] = useState<Error | null>();

    const getPolizaCliente = async (dni: string) => {
        try {
            setError(null);
            setLoading(true);

            let resp = await axios.get(`http://localhost:8000/api/clientes/${dni}`);
            const cliente: Cliente = resp.data;

            resp = await axios.get(`http://localhost:8000/api/polizas/cliente/${cliente._id}`);
            const poliza: Polizas[] = resp.data;

            setPolizas(poliza);

        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    const axiosError: Error = error.response.data;
                    setError(axiosError);
                }
            } else {
                console.log(error)
            }
        } finally {
            setLoading(false);
        }
    }

    return { isLoading, getPolizaCliente, polizas, error }

}
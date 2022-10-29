import axios from "axios";
import { useState } from "react";
import { Coberturas } from "../interfaces/interfaces";

interface Error {
    msg: string;
}

export const useRegistrarPoliza2 = () => {

    const [error, setError] = useState<Error | null>();
    const [isLoading, setLoading] = useState<boolean>(false);
    const [coberturas, setCoberturas] = useState<Coberturas[] | null>();

    const getCoberturasTipoVehiculo = async (marca: string, modelo: string, version: string, año: string) => {
        try {
            setCoberturas(null);
            setError(null);
            setLoading(true);

            let resp = await axios.get(`http://localhost:8000/api/coberturas/${marca}/${modelo}/${version}/${año}`);
            const coberturas: Coberturas[] = resp.data;
            setLoading(false);
            setCoberturas(coberturas);

        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    const axiosError: Error = error.response.data;
                    setError(axiosError);
                }
            } else {
                console.log(error)
            }
            setLoading(false);
        }
    }

    return {
        isLoading,
        error,
        getCoberturasTipoVehiculo,
        coberturas,
    }

}

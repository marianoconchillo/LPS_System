import { useState } from "react";
import { DefaultService, Coberturas, ApiError } from "../../generated/index";

interface Error {
    msg: string;
}

export const useRegistrarPoliza2 = () => {

    const [error, setError] = useState<Error | null>();
    const [isLoading, setLoading] = useState<boolean>(false);
    const [coberturas, setCoberturas] = useState<Coberturas | null>();

    const getCoberturasTipoVehiculo = async (marca: string, modelo: string, version: string, año: string) => {
        try {
            setCoberturas(null);
            setError(null);
            setLoading(true);

            const coberturas: Coberturas = await DefaultService.getApiCoberturas(marca, modelo, version, año);

            setLoading(false);
            setCoberturas(coberturas);

        } catch (error) {
            if (error instanceof ApiError) {
                setError(error.body);
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

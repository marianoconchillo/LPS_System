import { useState } from "react";
import { DefaultService, CuotasVencidas, Cliente, ApiError } from "../../generated/index";

interface Error {
    msg: string;
}

interface VerificacionPoliza {
    msg: string
}

const POLIZA_VIGENTE: string = "Ya existe póliza vigente para ese vehículo";

export const useRegistrarPoliza = () => {

    const [isLoading, setLoading] = useState<boolean>(false);

    const [errorDni, setErrorDni] = useState<Error | null>();
    const [dniCorrecto, setDniCorrecto] = useState<boolean>(false);

    const [errorPatente, setErrorPatente] = useState<Error | null>();
    const [patenteCorrecta, setPatenteCorrecta] = useState<boolean>(false);

    const getPolizaCliente = async (dni: string) => {
        try {
            setErrorDni(null);
            setLoading(true);
            setDniCorrecto(false);

            const cliente: Cliente = await DefaultService.getApiClientes(dni);

            if (cliente) {
                const cuotasVencidas: CuotasVencidas = await DefaultService.getApiPolizasCuotasVencidas(dni);
                if (cuotasVencidas.cuotasVencidas) {
                    setErrorDni({ msg: "El cliente posee cuotas vencidas" });
                } else {
                    localStorage.setItem("idCliente", cliente._id);
                    setDniCorrecto(true);
                }
            }
            setLoading(false);

        } catch (error) {
            if (error instanceof ApiError) {
                setErrorDni(error.body);
            } else {
                console.log(error)
            }
            setLoading(false);
        }
    }

    const verificarPolizaVigente = async (patente: string) => {
        try {
            setErrorPatente(null);
            setLoading(true);
            setPatenteCorrecta(false);

            const verificacionPatente: VerificacionPoliza = await DefaultService.getApiPolizasVehiculoAsegurado(patente);

            if (verificacionPatente.msg === POLIZA_VIGENTE) {
                setErrorPatente({ msg: POLIZA_VIGENTE });
            } else {
                setPatenteCorrecta(true);
            }

            setLoading(false);

        } catch (error) {
            if (error instanceof ApiError) {
                setErrorPatente(error.body);
            } else {
                console.log(error)
            }
            setLoading(false);
        }
    }

    return {
        isLoading,
        getPolizaCliente,
        errorDni,
        dniCorrecto,
        verificarPolizaVigente,
        errorPatente,
        patenteCorrecta
    }

}

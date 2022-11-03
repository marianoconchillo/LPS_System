import axios from "axios";
import { useState } from "react";
import { Cliente } from "../interfaces/interfaces";

interface Error {
    msg: string;
}

interface VerificacionPoliza {
    msg: string
}

interface CuotasVencidas {
    msg: string;
    cuotasVencidas?: []
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

            let resp = await axios.get(`http://localhost:8000/api/clientes/${dni}`);
            const cliente: Cliente = resp.data;

            if (cliente) {
                resp = await axios.get(`http://localhost:8000/api/polizas/cuotas-vencidas/${dni}`);
                const cuotasVencidas: CuotasVencidas = resp.data;
                if (cuotasVencidas.cuotasVencidas) {
                    setErrorDni({ msg: "El cliente posee cuotas vencidas" });
                } else {
                    localStorage.setItem("idCliente", cliente._id);
                    setDniCorrecto(true);
                }
            }
            setLoading(false);

        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    const axiosError: Error = error.response.data;
                    setErrorDni(axiosError);
                }
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

            let resp = await axios.get(`http://localhost:8000/api/polizas/vehiculoAsegurado/${patente}`);
            const verificacionPatente: VerificacionPoliza = resp.data;


            if (verificacionPatente.msg === POLIZA_VIGENTE) {
                setErrorPatente({ msg: POLIZA_VIGENTE });
            } else {
                setPatenteCorrecta(true);
            }

            setLoading(false);

        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    const axiosError: Error = error.response.data;
                    setErrorPatente(axiosError);
                }
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

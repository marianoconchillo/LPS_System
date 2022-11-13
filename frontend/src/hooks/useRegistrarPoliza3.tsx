import axios from "axios";
import { useState } from "react";
import { DefaultService, Coberturas, ApiError } from "../../generated/index";

interface Error {
    msg: string;
}

interface VehiculoAseguradoInsertar {
    patente: string,
    color: string,
    fotos: string[],
    vehiculo: {
        marca: string,
        modelo: string,
        version: string,
        año: string
    }
}

interface PolizaInsertar {
    productor: string,
    cliente: string,
    cobertura: string,
    vehiculoAsegurado: string
}

export const useRegistrarPoliza3 = () => {

    const [errorVehiculoAsegurado, setErrorVehiculoAsegurado] = useState<Error | null>();
    const [vehiculoCorrecto, setVehiculoCorrecto] = useState<boolean>(false);

    const [errorPoliza, setErrorPoliza] = useState<Error | null>();
    const [polizaCorrecta, setPolizaCorrecta] = useState<boolean>(false);

    const [isLoading, setLoading] = useState<boolean>(false);

    const insertarVehiculoAsegurado = async (color: string, fotos: string[]) => {
        try {
            setErrorVehiculoAsegurado(null);
            setLoading(true);

            const vehiculoAsegurado: VehiculoAseguradoInsertar = {
                patente: localStorage.getItem("patente") as string,
                color,
                fotos,
                vehiculo: {
                    marca: localStorage.getItem("marca") as string,
                    modelo: localStorage.getItem("modelo") as string,
                    version: localStorage.getItem("version") as string,
                    año: localStorage.getItem("año") as string,
                }
            }

            const vehiculoInsertado = await DefaultService.postApiVehiculosAsegurados(vehiculoAsegurado);

            setLoading(false);
            setVehiculoCorrecto(true);
            return vehiculoInsertado._id;

        } catch (error) {
            if (error instanceof ApiError) {
                setErrorVehiculoAsegurado(error.body);
            } else {
                console.log(error)
            }
            setLoading(false);
        }
    }

    const insertarPoliza = async (vehiculoAsegurado: string) => {
        try {
            setErrorPoliza(null);
            setLoading(true);

            const poliza: PolizaInsertar = {
                productor: "6349c99968e3e0e1dc084be5",
                cliente: localStorage.getItem("idCliente") as string,
                cobertura: localStorage.getItem("idCobertura") as string,
                vehiculoAsegurado
            }

            DefaultService.postApiPolizas(poliza);

            setPolizaCorrecta(true);
            setLoading(false);

        } catch (error) {
            if (error instanceof ApiError) {
                setErrorPoliza(error.body);
            } else {
                console.log(error)
            }
            setLoading(false);
        }
    }

    return {
        isLoading,
        errorVehiculoAsegurado,
        vehiculoCorrecto,
        errorPoliza,
        polizaCorrecta,
        insertarVehiculoAsegurado,
        insertarPoliza
    }
}
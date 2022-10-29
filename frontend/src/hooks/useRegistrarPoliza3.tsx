import axios from "axios";
import { useState } from "react";

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

interface VehiculoInsertado {
    _id: string
}

export const useRegistrarPoliza3 = () => {

    const [error, setError] = useState<Error | null>();
    const [isLoading, setLoading] = useState<boolean>(false);

    const insertarVehiculoAsegurado = async (color: string, fotos: string[]) => {
        try {
            setError(null);
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

            let resp = await axios.post(`http://localhost:8000/api/vehiculosAsegurados`, vehiculoAsegurado);
            const vehiculoInsertado: VehiculoInsertado = resp.data;

            setLoading(false);
            return vehiculoInsertado._id;
                        


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
        insertarVehiculoAsegurado
    }
}



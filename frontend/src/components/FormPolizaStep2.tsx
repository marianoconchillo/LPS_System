import { useState } from 'react';
import { DotWave } from '@uiball/loaders'
import { useForm } from "../hooks/useForm";
import { Steps } from '../pages/RegistrarPoliza';
import { useRegistrarPoliza2 } from '../hooks/useRegistrarPoliza2';

interface props {
    setStep: (step: Steps) => void;
}

type FormFields = {
    marca: string,
    modelo: string,
    version: string,
    año: string,
    cobertura: string,
}

export const FormPolizaStep2 = ({ setStep }: props) => {

    const { state: form, onChange } = useForm<FormFields>({
        marca: "",
        modelo: "",
        version: "",
        año: "",
        cobertura: ""
    });

    const { isLoading, error, getCoberturasTipoVehiculo, coberturas } = useRegistrarPoliza2();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await getCoberturasTipoVehiculo(form.marca, form.modelo, form.version, form.año);
    }

    const handleClick = (e: any) => {
        e.preventDefault();
        localStorage.setItem("marca", form.marca);
        localStorage.setItem("modelo", form.modelo);
        localStorage.setItem("version", form.version);
        localStorage.setItem("año", form.año);
        localStorage.setItem("cobertura", form.cobertura);
        setStep(3);
    }

    return (
        <form className="space-y-4 md:space-y-6 py-10 px-12" onSubmit={handleSubmit}>
            <p className="text-center text-lightBlue">Paso 2 de 3</p>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Marca del Vehículo</label>
                <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    name="marca"
                    id="marca"
                    placeholder="Marca"
                    required={true}
                    onChange={(value) => onChange(value.target.value, "marca")}
                />
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Modelo del Vehículo</label>
                <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    name="modelo"
                    id="modelo"
                    placeholder="Modelo"
                    required={true}
                    onChange={(value) => onChange(value.target.value, "modelo")}
                />
            </div>
            <div className="flex justify-between space-x-5">
                <div className="flex flex-col items-center">
                    <label className="mb-2 text-sm font-medium text-gray-900">Versión</label>
                    <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        name="version"
                        id="version"
                        required={true}
                        onChange={(value) => onChange(value.target.value, "version")}
                    />
                </div>
                <div className="flex flex-col items-center">
                    <label className="mb-2 text-sm font-medium text-gray-900">Año</label>
                    <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        name="año"
                        id="año"
                        required={true}
                        onChange={(value) => onChange(value.target.value, "año")}
                    />
                </div>
            </div>
            {
                coberturas && (
                    <div>
                        <label htmlFor="coberturas" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Seleccioná una opción</label>
                        <select
                            id="coberturas"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required={true}
                            value={form.cobertura}
                            onChange={(value) => onChange(value.target.value, "cobertura")}
                        >
                            <option>Elige una cobertura</option>
                            {
                                coberturas.map((cobertura) => (
                                    <option value={cobertura._id} key={cobertura._id}>{cobertura.codigoCobertura} - ${cobertura.precio} -
                                        {
                                            cobertura.daños.map((daño) => daño.descripcion)
                                        }
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                )
            }
            {error && <div className="text-center text-red-600 my-2">{error.msg}</div>}
            {
                !coberturas ? (
                    <button className="w-full text-white bg-blue hover:bg-veryLightBlue font-medium rounded-lg text-sm px-5 py-2.5 text-center">Buscar Coberturas</button>
                ) :
                    <button className="w-full text-white bg-blue hover:bg-veryLightBlue font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={handleClick}>Siguiente</button>
            }
            {isLoading && (<div className="my-10 flex justify-center"><DotWave color="#1b3b62" /></div>)}
        </form>
    )
}

import { DotWave } from '@uiball/loaders'
import { useEffect } from 'react';
import { useForm } from "../hooks/useForm";
import { useRegistrarPoliza } from "../hooks/useRegistrarPoliza1";
import { Steps } from '../pages/RegistrarPoliza';

interface props {
    setStep: (step: Steps) => void;
}

type FormFields = {
    dni: string,
    patente: string,
}

export const FormPolizaStep1 = ({ setStep }: props) => {

    const { state: form, onChange } = useForm<FormFields>({
        dni: "",
        patente: "",
    });

    const {
        isLoading,
        getPolizaCliente,
        errorDni,
        dniCorrecto,
        verificarPolizaVigente,
        errorPatente,
        patenteCorrecta
    } = useRegistrarPoliza();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await getPolizaCliente(form.dni);
        await verificarPolizaVigente(form.patente);
    }


    useEffect(() => {
        if (dniCorrecto && patenteCorrecta) {
            localStorage.setItem("dni", form.dni);
            localStorage.setItem("patente", form.patente);
            setStep(2);
        }
    }, [dniCorrecto, patenteCorrecta]);


    return (
        <form className="space-y-4 md:space-y-6 py-10 px-12" onSubmit={handleSubmit}>
            <p className="text-center text-lightBlue mb-8">Paso 1 de 3</p>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Número de documento</label>
                <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    name="dni"
                    id="dni"
                    placeholder="DNI del Cliente"
                    value={form.dni}
                    required={true}
                    onChange={(value) => onChange(value.target.value, "dni")}
                />
                {errorDni && <div className="text-center text-red-600 my-2">{errorDni.msg}</div>}
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Patente</label>
                <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    name="patente"
                    id="patente"
                    placeholder="ABC123 o AB123CD"
                    value={form.patente}
                    required={true}
                    onChange={(value) => onChange(value.target.value, "patente")}
                />
                {errorPatente && <div className="text-center text-red-600 my-2">{errorPatente.msg}</div>}
            </div>
            <button className="w-full text-white bg-blue hover:bg-veryLightBlue font-medium rounded-lg text-sm px-5 py-2.5 text-center">Siguiente</button>
            {isLoading && (<div className="my-10 flex justify-center"><DotWave color="#1b3b62" /></div>)}
        </form>
    )
}

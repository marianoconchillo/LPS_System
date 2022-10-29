import { DotWave } from '@uiball/loaders'
import { useForm } from "../hooks/useForm";
import { useRegistrarPoliza3 } from '../hooks/useRegistrarPoliza3';
import { Steps } from '../pages/RegistrarPoliza';

interface props {
    setStep: (step: Steps) => void;
}

type FormFields = {
    color: string,
    fotos: string[],
}

export const FormPolizaStep3 = ({ setStep }: props) => {

    const { isLoading, error, insertarVehiculoAsegurado } = useRegistrarPoliza3();

    const { state: form, onChange } = useForm<FormFields>({
        color: "",
        fotos: [""],
    });

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const idVehiculoAsegurado = await insertarVehiculoAsegurado(form.color, form.fotos);
        console.log(idVehiculoAsegurado);
    }

    return (
        <form className="space-y-4 md:space-y-6 py-10 px-12" onSubmit={handleSubmit}>
            <p className="text-center text-lightBlue">Paso 3 de 3</p>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Color del Vehículo</label>
                <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    name="color"
                    id="color"
                    placeholder="Color"
                    required={true}
                    onChange={(value) => onChange(value.target.value, "color")}
                />
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="file_input">Subir fotos</label>
                <input
                    className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none" id="file_input" type="file"
                    required={true}
                    onChange={(value) => onChange(value.target.value, "fotos")}
                />
            </div>
            {error && <div className="text-center text-red-600 my-2">{error.msg}</div>}
            <button className="w-full text-white bg-blue hover:bg-veryLightBlue font-medium rounded-lg text-sm px-5 py-2.5 text-center">Registrar Póliza</button>
            {isLoading && (<div className="my-10 flex justify-center"><DotWave color="#1b3b62" /></div>)}
        </form>
    )
}

import { useState } from "react"
import { FormPolizaStep1 } from "../components/FormPolizaStep1"
import { FormPolizaStep2 } from "../components/FormPolizaStep2";
import { FormPolizaStep3 } from "../components/FormPolizaStep3";

export type Steps = 1 | 2 | 3 | 4;

export const RegistrarPoliza = () => {

    const [step, setStep] = useState<Steps>(1);

    return (
        <div className="container mx-auto py-12 md:pt-16 px-5 flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl text-darkBlue text-center w-full">Registrar Póliza</h2>
            <hr className="my-8 h-px bg-veryLightBlue border w-full" />
            <div className="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 border">
                {
                    step === 1 ? <FormPolizaStep1 setStep={setStep} /> :
                        step === 2 ? <FormPolizaStep2 setStep={setStep} /> :
                            step === 3 ? <FormPolizaStep3 setStep={setStep} /> : <></>
                }
            </div>
        </div>
    )
}

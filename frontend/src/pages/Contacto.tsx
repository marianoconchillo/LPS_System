export const Contacto = () => {
    return (
        <div className="container mx-auto py-12 md:pt-16 px-5 flex flex-col items-center">
            <h2 className="text-4xl text-darkBlue text-left w-full">Contacto</h2>
            <div className="w-full">
                <h5 className="text-lg mt-5 mb-2 text-slate-900">Contactanos a través de múltiples medios.</h5>
                <h5 className="text-lg text-slate-900">Estamos para ayudarte.</h5>
            </div>
            <hr className="my-8 h-px bg-veryLightBlue border-2 w-full" />
            <div className="w-full">
                <h5 className="text-xl text-slate-700 font-bold">Asistencia al asegurado</h5>
                <p className="mt-1 mb-3 text-slate-900">Por teléfono al 0800-222-2577</p>
                <h5 className="text-xl text-slate-700 font-bold">Reclamos de terceros</h5>
                <p className="mt-1 mb-3 text-slate-900">Por teléfono de 9 a 17hs: +54 2983 430 780</p>
                <h5 className="text-xl text-slate-700 font-bold">Información de reparaciones</h5>
                <p className="mt-1 mb-3 text-slate-900">Por WhatsApp al +54 9 2983 418702</p>
            </div>
        </div>
    )
}

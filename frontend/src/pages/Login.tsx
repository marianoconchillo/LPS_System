import logo from "../assets/logo.png";

export const Login = () => {

    const handleSubmit = (e: any) => {
        e.preventDefault();
        
    }

    return (
        <section className="container mx-auto py-2 md:py-0">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:py-10">
                <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                    <img className="w-20 h-20" src={logo} alt="logo" />
                </div>
                <div className="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 border-2">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-veryDarkBlue md:text-2xl">
                            Iniciar Sesión
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Tu email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required={true} />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Contraseña</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required={true} />
                            </div>

                            <button className="w-full text-white bg-blue hover:bg-veryLightBlue font-medium rounded-lg text-sm px-5 py-2.5 text-center">Iniciar Sesión</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

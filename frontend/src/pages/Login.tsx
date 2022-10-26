import { useContext, useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext/AuthContext";
import logo from "../assets/logo.png";
import google from "../assets/google.png";
import { useForm } from "../hooks/useForm";

type FormFields = {
    email: string,
    password: string,
}

export const Login = () => {

    const { login, loginWithGoogle, user } = useContext(AuthContext);

    const navigate: NavigateFunction = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/productor");
        }
        window.scrollTo(0, 0);
    }, [])


    const [error, setError] = useState<boolean>(false);

    const { state: form, onChange } = useForm<FormFields>({
        email: "",
        password: "",
    });

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await login(form.email, form.password);
            navigate("/productores");
        } catch (error) {
            setError(true);
        }
    }

    const handleGoogleSignin = async () => {
        try {
            await loginWithGoogle();
            navigate("/productores");
        } catch (error) {
            setError(true);
        }
    };

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
                        <button className="flex w-3/4 md:w-1/2 py-2 rounded-md border justify-evenly text-slate-800 tracking-wide" onClick={handleGoogleSignin}>
                            <img className="w-5 h-5" src={google} alt="logo" />
                            <p>Utilizando google</p>
                        </button>
                        <div className="w-full flex items-center justify-between">
                            <hr className="bg-veryLightBlue border-2 w-5/12" />
                            <p className="">o</p>
                            <hr className="bg-veryLightBlue border-2 w-5/12" />
                        </div>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Tu email</label>
                                <input
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="name@company.com"
                                    required={true}
                                    onChange={(value) => onChange(value.target.value, "email")}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Contraseña</label>
                                <input
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    required={true}
                                    onChange={(value) => onChange(value.target.value, "password")}
                                />
                            </div>
                            <button className="w-full text-white bg-blue hover:bg-veryLightBlue font-medium rounded-lg text-sm px-5 py-2.5 text-center">Iniciar Sesión</button>
                            {
                                error && <div className="text-center text-red-600">Error de credenciales, intente nuevamente.</div>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

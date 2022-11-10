import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext/AuthContext";
import logo from "../assets/logo.png";
import google from "../assets/google.png";
import { useForm } from "../hooks/useForm";
import { LoginForm } from "../components/LoginForm";

export type FormFields = {
    email: string,
    password: string,
}


const Login = () => {

    const { login, loginWithGoogle, user } = useContext(AuthContext);

    const navigate = useNavigate();

    // useEffect(() => {
    //     window.scrollTo(0, 0);
    // }, []);

    useEffect(() => {
        if (user) {
            return navigate("/productor");
        }
    }, [user]);

    const [error, setError] = useState<boolean>(false);

    const { state: form, onChange } = useForm<FormFields>({
        email: "",
        password: "",
    });

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await login(form.email, form.password);
            navigate("/productor");
        } catch (error) {
            setError(true);
        }
    }

    const handleGoogleSignin = async () => {
        try {
            await loginWithGoogle();
            navigate("/productor");
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
                        <LoginForm handleSubmit={handleSubmit} onChange={onChange} error={error} form={form} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login;
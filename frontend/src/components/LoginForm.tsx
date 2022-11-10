import { format } from "path"
import { FormFields } from "../pages/Login"

export interface Props {
    handleSubmit: (e: any) => void,
    onChange: <K extends Object>(value: K, field: keyof FormFields) => void,
    error: boolean,
    form: FormFields
}

export const LoginForm = ({ handleSubmit, onChange, error, form }: Props) => {

    return (
        <form data-testid="login-form" className="space-y-4 md:space-y-6" onSubmit={handleSubmit} id="login-form">
            <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Tu email</label>
                <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    data-testid="email"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="name@company.com"
                    required={true}
                    value={form.email}
                    onChange={(value) => onChange(value.target.value, "email")}
                />
            </div>
            <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Contraseña</label>
                <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    data-testid="password"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    required={true}
                    value={form.password}
                    onChange={(value) => onChange(value.target.value, "password")}
                />
            </div>
            <button
                className="w-full text-white bg-blue hover:bg-veryLightBlue font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                type="submit"
                data-testid="submit-button"
                disabled={form.email === "" && form.password === ""}
            >
                Iniciar Sesión
            </button>
            {
                error && <div data-testid="label" className="text-center text-red-600">Error de credenciales, intente nuevamente.</div>
            }
        </form>
    )
}

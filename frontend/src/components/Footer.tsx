import logo from "../assets/logo.png";

export const Footer = () => {
    return (
        <footer className="p-4 bg-slate-200 md:bg-white rounded-lg shadow md:px-20 md:pt-20 md:pb-10">
            <div className="sm:flex sm:items-center sm:justify-between">
                <a className="flex items-center justify-center mb-4 sm:mb-0">
                    <img src={logo} className="mr-3 h-16" alt="Logo LPS" />
                    <span className="self-center text-xl md:text-2xl font-medium whitespace-nowrap text-slate-900">La Perseverancia Seguros</span>
                </a>
                <ul className="flex flex-wrap items-center justify-center mb-6 text-sm text-gray-500 sm:mb-0">
                    <li>
                        <a href="#" className="mr-4 hover:underline md:mr-6">Política de privacidad</a>
                    </li>
                    <li>
                        <a href="#" className="mr-4 hover:underline md:mr-6 ">Contacto</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline">Nosotros</a>
                    </li>
                </ul>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
            <span className="block text-sm text-gray-500 text-center ">© 2022 <a href="https://flowbite.com/" className="hover:underline">La Perseverancia Seguros</a>
            </span>
        </footer>
    )
}
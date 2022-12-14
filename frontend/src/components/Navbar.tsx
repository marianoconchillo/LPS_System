import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext/AuthContext";
import logo from "../assets/logo.png";

export const Navbar = () => {

    const navigate = useNavigate();

    const { user, logout } = useContext(AuthContext);
    const homeLinks = ["Nosotros", "Contacto"];
    const [visible, setVisible] = useState<boolean>(true);

    const preventDefault = (e: any) => {
        e.preventDefault();
        if (!visible) {
            setVisible(true);
        }
    }

    const handleClick = (e: any) => {
        preventDefault(e);
        navigate("/");
    }

    const handleClickLogin = (e: any) => {
        preventDefault(e);
        navigate("/login");
    }

    const handleClickLogout = async (e: any) => {
        preventDefault(e);

        try {
            await logout();
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='shadow-2xl w-full sticky z-10 top-0 left-0 bg-veryLightBlue py-3 md:py-6 px-7 md:px-20'>

            <div className='md:flex items-center justify-between'>

                <div className="flex items-center justify-between px-6">
                    <img src={logo} className="w-14 h-14 md:w-20 md:h-20 cursor-pointer" alt="Logo LPS" onClick={handleClick} />

                    <div onClick={() => setVisible(!visible)} className='text-3xl right-8 top-6 cursor-pointer md:hidden'>
                        <FontAwesomeIcon icon={!visible ? faXmark : faBars} color="white" />
                    </div>
                </div>

                <ul className={`bg-white ${!visible && "h-screen"} md:bg-transparent md:flex md:items-center md:pb-0 pb-12 md:my-0 my-3 md:h-auto absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 ${!visible ? 'top-50 ' : 'top-[-490px]'}`}>
                    {
                        !user ? (
                            <>
                                {
                                    homeLinks.map((link) => (
                                        <li key={link} className="md:ml-8 md:my-0 mt-5">
                                            <NavLink
                                                to={link.toLocaleLowerCase()}
                                                onClick={() => setVisible(true)}
                                                style={({ isActive }) => { return { fontWeight: isActive ? "bolder" : "normal" } }}
                                            >
                                                <span className='hover:text-gray-400 duration-500 md:text-white text-slate-800'>{link}</span>
                                            </NavLink>
                                        </li>
                                    ))
                                }
                                <button
                                    onClick={handleClickLogin}
                                    className="flex items-center bg-white hover:bg-blue hover:text-white duration-500 py-2 px-7 border rounded md:ml-8 md:my-0 mt-5 text-slate-800">
                                    <span>Ingresar</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <li className="md:ml-8 md:my-0 mt-5">
                                    <NavLink
                                        to="/productor"
                                        onClick={() => setVisible(true)}
                                        style={({ isActive }) => { return { fontWeight: isActive ? "bolder" : "normal" } }}
                                    >
                                        <span className='hover:text-gray-400 duration-500 md:text-white text-slate-800'>Home</span>
                                    </NavLink>
                                </li>
                                <button
                                    onClick={handleClickLogout}
                                    className="flex items-center bg-white hover:bg-blue hover:text-white duration-500 py-2 px-7 border rounded md:ml-8 md:my-0 mt-5 text-slate-800">
                                    <span>Salir</span>
                                </button>
                            </>
                        )
                    }
                </ul>

            </div>

        </div>
    )
}

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.png";

interface Props {
    visible: boolean,
    setVisible: (open: boolean) => void;
}

export const Navbar = ({ visible, setVisible }: Props) => {

    const homeLinks = ["Nosotros", "Contacto"];

    return (
        <div className='shadow-2xl w-full sticky z-10 top-0 left-0 bg-veryLightBlue py-3 md:py-6 px-7 md:px-20'>

            <div className='md:flex items-center justify-between'>

                <div className="flex items-center justify-between px-6">
                    <img src={logo} className="w-14 h-14 md:w-20 md:h-20" />

                    <div onClick={() => setVisible(!visible)} className='text-3xl right-8 top-6 cursor-pointer md:hidden'>
                        <FontAwesomeIcon icon={!visible ? faXmark : faBars} color="white" />
                    </div>
                </div>

                <ul className={`md:flex md:items-center md:pb-0 pb-12 md:my-0 my-6 absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 ${!visible ? 'top-50 ' : 'top-[-490px]'}`}>
                    {
                        homeLinks.map((link) => (
                            <li key={link} className="md:ml-8 md:my-0 mt-5">
                                <a href="#" className='hover:text-gray-400 duration-500 md:text-white text-slate-800'>{link}</a>
                            </li>
                        ))
                    }
                    <button
                        className="flex items-center bg-white hover:bg-blue hover:text-white duration-500 py-2 px-7 border rounded md:ml-8 md:my-0 mt-5 text-slate-800">
                        <span>Ingresar</span>
                    </button>
                </ul>


            </div>

        </div>
    )
}

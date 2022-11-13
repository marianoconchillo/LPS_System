import { NavLink } from "react-router-dom"
import { Polizas } from "../../generated/index";

interface Props {
    polizas: Polizas
}

export const Table = ({ polizas }: Props) => {

    return (
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="py-3 px-6">
                            Número de Póliza
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Cobertura
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Vehículo
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Patente
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Acción
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        polizas.map((poliza) => (
                            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700" key={poliza._id}>
                                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {poliza.numeroPoliza}
                                </th>
                                <td className="py-4 px-6">
                                    N°{poliza.cobertura?.codigoCobertura} - ${poliza.cobertura?.precio}
                                </td>
                                <td className="py-4 px-6">
                                    {`${poliza.vehiculoAsegurado?.tipoVehiculo?.marca} - ${poliza.vehiculoAsegurado?.tipoVehiculo?.modelo} - ${poliza.vehiculoAsegurado?.tipoVehiculo?.version} - ${poliza.vehiculoAsegurado?.tipoVehiculo?.año}`}
                                </td>
                                <td className="py-4 px-6">
                                    {poliza.vehiculoAsegurado?.patente}
                                </td>
                                <td className="py-4 px-6">
                                    <NavLink to="/" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                        Ver Detalles
                                    </NavLink>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

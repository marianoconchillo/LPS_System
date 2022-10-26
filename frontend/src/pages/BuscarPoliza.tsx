import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export const BuscarPoliza = () => {
  return (
    <div className="container mx-auto py-12 md:pt-16 px-5 flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl text-darkBlue text-center w-full">Buscar Póliza</h2>
      <hr className="my-8 h-px bg-veryLightBlue border w-full" />
      <section className="w-full flex flex-col items-center md:w-3/4 lg:w-1/2 mb-5">
        <div className="flex relative items-center justify-center w-3/4">
          <FontAwesomeIcon icon={faMagnifyingGlass} color="#365883" size="xl" className="absolute pl-4 left-0" />
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block py-2.5 px-16 w-full"
            placeholder="DNI del cliente..."
          />
        </div>
      </section>
    </div>
  )
}

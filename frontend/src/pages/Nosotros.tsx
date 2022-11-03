import { useEffect } from "react";
import historia from "../assets/historia.jpg";

const Nosotros = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto py-12 md:pt-16 px-5 flex flex-col items-center">
      <h2 className="text-4xl text-darkBlue text-center">Quiénes Somos</h2>
      <hr className="my-8 h-px bg-veryLightBlue border-2 w-1/2"></hr>
      <img src={historia} className="brightness-90" />
      <p className="text-veryDarkBlue mt-8 tracking-wider leading-6 whitespace-pre-line">
        <span className="italic font-bold">La Perseverancia Seguros</span> cuenta con una reconocida experiencia abocada a la atención personalizada y una rápida resolución en los siniestros, ofreciendo una amplia política de suscripción y costos competitivos acordes a las condiciones del mercado.
        <br />
        <br />
        Desde el año 2018, Evaluadora Latinoamericana S.A., agencia calificadora de riesgo con más de 25 años de trayectoria realiza la evaluación de La Perseverancia Seguros S.A. Esta calificación se renueva en forma anual, y responde a un análisis exhaustivo sobre la fortaleza, solvencia y capacidad de pago de siniestros de la compañía a largo plazo.
      </p>
    </div>
  )
}

export default Nosotros;
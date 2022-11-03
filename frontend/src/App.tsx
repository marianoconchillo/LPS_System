import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/authContext/AuthProvider";
import { PrivateRoutes } from "./components/PrivateRoutes";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Loading } from "./components/Loading";

const HomePage = lazy(() => import("./pages/HomePage"));
const Nosotros = lazy(() => import("./pages/Nosotros"));
const Contacto = lazy(() => import("./pages/Contacto"));
const Login = lazy(() => import("./pages/Login"));
const Productor = lazy(() => import("./pages/Productor"));
const BuscarPoliza = lazy(() => import("./pages/BuscarPoliza"));
const RegistrarPoliza = lazy(() => import("./pages/RegistrarPoliza"));

export default function App() {

    return (
        <AuthProvider>
            <BrowserRouter>
                <Navbar />
                <Suspense fallback={<Loading />}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="nosotros" element={<Nosotros />} />
                        <Route path="contacto" element={<Contacto />} />
                        <Route path="login" element={<Login />} />
                        <Route element={<PrivateRoutes />}>
                            <Route path="productor" element={<Productor />} />
                            <Route path="buscarPoliza" element={<BuscarPoliza />} />
                            <Route path="registrarPoliza" element={<RegistrarPoliza />} />
                        </Route>
                    </Routes>
                </Suspense>
                <Footer />
            </BrowserRouter>
        </AuthProvider>
    )
}

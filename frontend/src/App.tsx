import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { Nosotros } from "./pages/Nosotros";
import { Contacto } from "./pages/Contacto";
import { Login } from "./pages/Login";
import { AuthProvider } from "./context/authContext/AuthProvider";
import { Productor } from "./pages/Productor";
import { PrivateRoutes } from "./components/PrivateRoutes";

export default function App() {

    return (
        <AuthProvider>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="nosotros" element={<Nosotros />} />
                    <Route path="contacto" element={<Contacto />} />
                    <Route path="login" element={<Login />} />
                    <Route element={<PrivateRoutes />}>
                        <Route path="productor" element={<Productor />} />
                    </Route>
                </Routes>
                <Footer />
            </BrowserRouter>
        </AuthProvider>
    )
}

import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";

export default function App() {

    return (
        <>
            <Navbar />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </BrowserRouter>
            <Footer />
        </>
    )
}

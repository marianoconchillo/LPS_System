import { useState } from "react";
import { Navbar } from "./components/Navbar";

export default function App() {

    const [visible, setVisible] = useState<boolean>(true);

    return (
        <>
            <Navbar visible={visible} setVisible={setVisible} />
            <div className={`mt-40 ${visible ? "visible" : "invisible"} md:visible`}>
                <h3 className="">Hola Mundo</h3>
            </div>
        </>
    )
}

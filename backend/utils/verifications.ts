import mongoose from "mongoose";

// Expresiones regulares
const CONTIENE_NUMEROS = "[0-9]+";
const CONTIENTE_LETRAS = "[a-zA-Z]";

export const numeroProductorValido = (numProductor: string): boolean => {
    // número entero mayor a 0 y menor o igual a 999

    let esValido = true;

    if (!numProductor.match(CONTIENTE_LETRAS)) {
        let number = Number(numProductor);
        if (number <= 0 || number > 999) {
            esValido = false;
        }
    } else {
        esValido = false;
    }

    return esValido;
}

export const dniValido = (dni: string): boolean => {
    // cadena numérica de 7 dígitos como mínimo y 8 como máximo

    let esValido = true;

    if (!dni.match(CONTIENTE_LETRAS)) {

        if (dni.match(CONTIENE_NUMEROS)) {
            if (dni.length < 7 || dni.length > 8) {
                esValido = false;
            }
        } else {
            esValido = false;
        }

    } else {
        esValido = false;
    }

    return esValido;
}

export const patenteValida = (patente: string): boolean => {
    // - 6 caracteres (3 letras seguidas de 3 números)
    // - 7 caracteres (2 letras seguidas de 3 números seguidos de 2 letras)

    let esValido = true;

    if (patente.length >= 6 && patente.length <= 7) {

        if (patente.length === 6) {
            const letras = patente.slice(0, 3);
            const numeros = patente.slice(3, 6);
            if (letras.match(CONTIENE_NUMEROS) || numeros.match(CONTIENTE_LETRAS)) {
                esValido = false;
            }
        } else if (patente.length === 7) {
            const letrasA = patente.slice(0, 2);
            const numeros = patente.slice(2, 5);
            const letrasB = patente.slice(5, 7);

            if (letrasA.match(CONTIENE_NUMEROS) || numeros.match(CONTIENTE_LETRAS) || letrasB.match(CONTIENE_NUMEROS)) {
                esValido = false;
            }
        }

    } else {
        esValido = false;
    }

    return esValido;
}

export const verificarTipoVehiculo = (marca: string, modelo: string, version: string, año: string): boolean => {
    // Marca    --> cadena con 4 letras como mínimo y 12 como máximo
    // Modelo   --> cadena con 2 caracteres como mínimo y 16 como máximo
    // Version  --> cadena alfanumérica de 2 caracteres como máximo y 16 
    // Año      --> cadena numérica de 4 dígitos mayor o igual a 1990 y menor al año actual (2022)

    let esValido = true;


    if (!marca.match(CONTIENE_NUMEROS)) {
        if (marca.length >= 4 && marca.length <= 12) {
            if (modelo.length >= 2 && modelo.length <= 16) {
                if (version.length >= 2 && version.length <= 16) {
                    if (!año.match(CONTIENTE_LETRAS)) {
                        const number = Number(año);
                        const yearToday = new Date().getFullYear();
                        if (number < 1990 || number > yearToday) {
                            esValido = false;
                        }
                    }
                } else {
                    esValido = false;
                }
            } else {
                esValido = false;
            }
        } else {
            esValido = false;
        }
    } else {
        esValido = false;
    }

    return esValido;
}

export const verificarObjectId = (id: string): boolean => {
    // cadena hexadecimal de 24 símbolos

    let esValido = true;

    if (mongoose.Types.ObjectId.isValid(id)) {
        if ((String)(new mongoose.Types.ObjectId(id)) !== id) {
            esValido = false;
        }
    } else {
        esValido = false;
    }


    return esValido;
}
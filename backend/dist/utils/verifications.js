"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patenteValida = exports.dniValido = exports.numeroProductorValido = void 0;
// Expresiones regulares
const CONTIENE_NUMEROS = "[0-9]+";
const CONTIENTE_LETRAS = "[a-zA-Z]";
const numeroProductorValido = (numProductor) => {
    // número entero mayor a 0 y menor o igual a 999
    let esValido = true;
    if (!numProductor.match(CONTIENTE_LETRAS)) {
        let number = Number(numProductor);
        if (number <= 0 || number > 999) {
            esValido = false;
        }
    }
    else {
        esValido = false;
    }
    return esValido;
};
exports.numeroProductorValido = numeroProductorValido;
const dniValido = (dni) => {
    // cadena numérica de 7 dígitos como mínimo y 8 como máximo
    let esValido = true;
    if (!dni.match(CONTIENTE_LETRAS)) {
        if (dni.match(CONTIENE_NUMEROS)) {
            if (dni.length < 7 || dni.length > 8 || dni.length === 0) {
                esValido = false;
            }
        }
        else {
            esValido = false;
        }
    }
    else {
        esValido = false;
    }
    return esValido;
};
exports.dniValido = dniValido;
const patenteValida = (patente) => {
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
        }
        else if (patente.length === 7) {
            const letrasA = patente.slice(0, 2);
            const numeros = patente.slice(2, 5);
            const letrasB = patente.slice(5, 7);
            if (letrasA.match(CONTIENE_NUMEROS) || numeros.match(CONTIENTE_LETRAS) || letrasB.match(CONTIENE_NUMEROS)) {
                esValido = false;
            }
        }
    }
    else {
        esValido = false;
    }
    return esValido;
};
exports.patenteValida = patenteValida;
//# sourceMappingURL=verifications.js.map
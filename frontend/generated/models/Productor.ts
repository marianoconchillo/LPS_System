/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Productor = {
    _id?: string;
    numeroProductor?: number;
    sucursal?: {
        _id?: string;
        numero?: number;
        direccion?: string;
        localidad?: {
            nombre?: string;
            provincia?: string;
            CP?: string;
            _id?: string;
        };
        __v?: number;
    };
    nombre?: string;
    apellido?: string;
    dni?: string;
    email?: string;
    __v?: number;
};


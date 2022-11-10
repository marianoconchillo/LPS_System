/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Cobertura } from './Cobertura';
import type { Cuota } from './Cuota';
import type { Productor } from './Productor';

export type Polizas = Array<{
    _id?: string;
    numeroPoliza?: number;
    fechaInicio?: string;
    fechaFin?: string;
    productor?: Productor;
    cliente?: string;
    cobertura?: Cobertura;
    vehiculoAsegurado?: {
        _id?: string;
        patente?: string;
        color?: string;
        fotos?: Array<string>;
        __v?: number;
        tipoVehiculo?: {
            _id?: string;
            marca?: string;
            modelo?: string;
            version?: string;
            'año'?: string;
            __v?: number;
        };
        cuotas?: Array<Cuota>;
    };
}>;

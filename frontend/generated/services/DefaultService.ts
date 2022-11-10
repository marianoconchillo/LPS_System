/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Cliente } from '../models/Cliente';
import type { Coberturas } from '../models/Coberturas';
import type { CuotasVencidas } from '../models/CuotasVencidas';
import type { Error } from '../models/Error';
import type { Polizas } from '../models/Polizas';
import type { Productor } from '../models/Productor';
import type { VehiculoAsegurado } from '../models/VehiculoAsegurado';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {

    /**
     * Auto generated using Swagger Inspector
     * @param dni
     * @returns Cliente Auto generated using Swagger Inspector
     * @throws ApiError
     */
    public static getApiClientes(
        dni: string,
    ): CancelablePromise<Cliente> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/clientes/{dni}',
            path: {
                'dni': dni,
            },
            errors: {
                400: `Auto generated using Swagger Inspector`,
            },
        });
    }

    /**
     * Auto generated using Swagger Inspector
     * @param idVehiculoAsegurado
     * @returns any Auto generated using Swagger Inspector
     * @throws ApiError
     */
    public static getApiVehiculosAseguradosTipoVehiculo(
        idVehiculoAsegurado: string,
    ): CancelablePromise<{
        tipoVehiculo?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/vehiculosAsegurados/tipoVehiculo/{idVehiculoAsegurado}',
            path: {
                'idVehiculoAsegurado': idVehiculoAsegurado,
            },
            errors: {
                400: `Auto generated using Swagger Inspector`,
            },
        });
    }

    /**
     * Auto generated using Swagger Inspector
     * @param marca
     * @param modelo
     * @param version
     * @param anio
     * @returns Coberturas Auto generated using Swagger Inspector
     * @throws ApiError
     */
    public static getApiCoberturas(
        marca: string,
        modelo: string,
        version: string,
        anio: string,
    ): CancelablePromise<Coberturas> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/coberturas/{marca}/{modelo}/{version}/{anio}',
            path: {
                'marca': marca,
                'modelo': modelo,
                'version': version,
                'anio': anio,
            },
            errors: {
                400: `Auto generated using Swagger Inspector`,
            },
        });
    }

    /**
     * Auto generated using Swagger Inspector
     * @param patenteVehiculoAsegurado
     * @returns Error Auto generated using Swagger Inspector
     * @throws ApiError
     */
    public static getApiPolizasVehiculoAsegurado(
        patenteVehiculoAsegurado: string,
    ): CancelablePromise<Error> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/polizas/vehiculoAsegurado/{patenteVehiculoAsegurado}',
            path: {
                'patenteVehiculoAsegurado': patenteVehiculoAsegurado,
            },
            errors: {
                400: `Auto generated using Swagger Inspector`,
            },
        });
    }

    /**
     * Auto generated using Swagger Inspector
     * @param requestBody
     * @returns VehiculoAsegurado Auto generated using Swagger Inspector
     * @throws ApiError
     */
    public static postApiVehiculosAsegurados(
        requestBody?: {
            color?: string;
            vehiculo?: {
                marca?: string;
                modelo?: string;
                version?: string;
                'año'?: string;
            };
            fotos?: Array<string>;
            patente?: string;
        },
    ): CancelablePromise<VehiculoAsegurado> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/vehiculosAsegurados',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Auto generated using Swagger Inspector`,
            },
        });
    }

    /**
     * Auto generated using Swagger Inspector
     * @param idCliente
     * @returns Polizas Auto generated using Swagger Inspector
     * @throws ApiError
     */
    public static getApiPolizasCliente(
        idCliente: string,
    ): CancelablePromise<Polizas> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/polizas/cliente/{idCliente}',
            path: {
                'idCliente': idCliente,
            },
            errors: {
                400: `Auto generated using Swagger Inspector`,
            },
        });
    }

    /**
     * Auto generated using Swagger Inspector
     * @param dniCliente
     * @returns any Auto generated using Swagger Inspector
     * @throws ApiError
     */
    public static getApiPolizasCuotasVencidas(
        dniCliente: string,
    ): CancelablePromise<(CuotasVencidas | Error)> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/polizas/cuotas-vencidas/{dniCliente}',
            path: {
                'dniCliente': dniCliente,
            },
            errors: {
                400: `Auto generated using Swagger Inspector`,
            },
        });
    }

    /**
     * Auto generated using Swagger Inspector
     * @param numeroProductor
     * @returns Productor Auto generated using Swagger Inspector
     * @throws ApiError
     */
    public static getApiProductores(
        numeroProductor: string,
    ): CancelablePromise<Productor> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/productores/{numeroProductor}',
            path: {
                'numeroProductor': numeroProductor,
            },
            errors: {
                400: `Auto generated using Swagger Inspector`,
            },
        });
    }

    /**
     * Auto generated using Swagger Inspector
     * @param idTipoVehiculo
     * @returns Coberturas Auto generated using Swagger Inspector
     * @throws ApiError
     */
    public static getApiCoberturasTipoVehiculo(
        idTipoVehiculo: string,
    ): CancelablePromise<Coberturas> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/coberturas/tipoVehiculo/{idTipoVehiculo}',
            path: {
                'idTipoVehiculo': idTipoVehiculo,
            },
            errors: {
                400: `Auto generated using Swagger Inspector`,
            },
        });
    }

    /**
     * Auto generated using Swagger Inspector
     * @param requestBody
     * @returns any Auto generated using Swagger Inspector
     * @throws ApiError
     */
    public static postApiPolizas(
        requestBody?: {
            cliente?: string;
            cobertura?: string;
            productor?: string;
            vehiculoAsegurado?: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/polizas',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Auto generated using Swagger Inspector`,
            },
        });
    }

}

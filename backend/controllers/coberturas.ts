import { Request, Response } from "express";
import { Cobertura, ICobertura } from "../models/dataBase/cobertura";
import { Daño } from "../models/dataBase/daño";
import { TipoVehiculo } from "../models/dataBase/tipoVehiculo";
import { verificarObjectId, verificarTipoVehiculo } from "../utils/verifications";

// @desc    Get Cobertura
// @route   GET /api/coberturas/:codigoCobertura
// @access  Private
export const getCobertura = async (req: Request, res: Response) => {

    const { codigoCobertura } = req.params;

    const cobertura = await Cobertura.findOne({ codigoCobertura })
        .populate("vehiculos")
        .populate("daños");

    if (cobertura) {
        res.json(cobertura);
    } else {
        res.status(400).json({
            msg: `No existe cobertura código ${codigoCobertura}`
        })
    }

}

// @desc    Get Cobertura por TipoVehículo
// @route   GET /api/coberturas/:marca/:modelo/:version/:anio
// @access  Private
export const getCoberturaByTipoVehiculo = async (req: Request, res: Response) => {

    const { marca, modelo, version, anio } = req.params;

    if (verificarTipoVehiculo(marca, modelo, version, anio)) {
        const tipoVehiculo = await TipoVehiculo.findOne({ marca, modelo, version, año: anio });

        if (tipoVehiculo) {

            const coberturas = await Cobertura.find({ vehiculos: tipoVehiculo }).populate("daños");

            if (coberturas.length > 0) {
                res.json(coberturas);
            } else {
                res.status(400).json({
                    msg: `No existen coberturas para vehículo ${marca} ${modelo} ${version} ${anio}`
                })
            }

        } else {
            res.status(400).json({
                msg: `No existe Vehículo ${marca} ${modelo} ${version} ${anio}`
            })
        }
    } else {
        res.status(400).json({
            msg: `Tipo Vehículo inválido ${marca} ${modelo} ${version} ${anio}`
        })
    }

}

// @desc    Get Coberturas por ID TipoVehículo
// @route   GET /api/coberturas/tipoVehiculo/:id
// @access  Private
export const getCoberturaByIDTipoVehiculo = async (req: Request, res: Response) => {

    const { id } = req.params;

    if (verificarObjectId(id)) {
        const tipoVehiculo = await TipoVehiculo.findById(id);

        if (tipoVehiculo) {

            const coberturas = await Cobertura.find({ vehiculos: tipoVehiculo });

            if (coberturas.length > 0) {
                res.json(coberturas);
            } else {
                res.status(400).json({
                    msg: `No existen coberturas para ese vehículo`
                })
            }

        } else {
            res.status(400).json({
                msg: `No existen coberturas para ese vehículo`
            })
        }
    } else {
        res.status(400).json({
            msg: `ObjectID Inválido`
        })
    }

}



// @desc    Post Cobertura
// @route   POST /api/coberturas
// @access  Private
export const postCobertura = async (req: Request, res: Response) => {

    const { body } = req;

    const { vehiculos, daños } = body;

    try {
        if (vehiculos.length > 0 && daños.length > 0) {

            const ids_vehiculos = [];
            const ids_daños = [];

            for (let i = 0; i < vehiculos.length; i++) {
                let vehiculo = await TipoVehiculo.findOne(vehiculos[i]);
                if (vehiculo) {
                    ids_vehiculos.push(vehiculo._id);
                } else {
                    res.status(500).json({
                        msg: `TipoVehiculo no encontrado`
                    });
                }
            }

            for (let i = 0; i < daños.length; i++) {
                let daño_encontrado = await Daño.findOne(daños[i]);
                if (daño_encontrado) {
                    ids_daños.push(daño_encontrado._id);
                } else {
                    res.status(500).json({
                        msg: `Daño no encontrado`
                    });
                }
            }

            const cobertura = new Cobertura({
                codigoCobertura: body.codigoCobertura,
                precio: body.precio,
                vehiculos: ids_vehiculos,
                daños: ids_daños
            });

            await cobertura.save();
            res.json(cobertura);

        }
    } catch (error) {
        res.status(500).json({
            msg: `Error intentando crear Cobertura`
        });
    }
}

// @desc    Put Cobertura
// @route   PUT /api/coberturas/:codigoCobertura
// @access  Private
export const putCobertura = async (req: Request, res: Response) => {

    const { codigoCobertura } = req.params;
    const { body } = req;

    try {

        const cobertura = await Cobertura.findOne({ codigoCobertura });

        if (!cobertura) {
            res.status(400).json({
                msg: `No existe Cobertura con código ${codigoCobertura}`
            })
        } else {
            await cobertura.updateOne(body);
            res.json({
                msg: `Cobertura actualizada con éxtio`
            });
        }


    } catch (error) {
        res.status(500).json({
            msg: `Error al actualizar Cobertura`
        });
    }

}

// @desc    Delete Cobertura
// @route   DELETE /api/coberturas/:codigoCobertura
// @access  Private
export const deleteCobertura = async (req: Request, res: Response) => {

    const { codigoCobertura } = req.params;

    try {

        const cobertura = await Cobertura.findOne({ codigoCobertura });

        if (!cobertura) {
            res.status(400).json({
                msg: `No existe Cobertura con código ${codigoCobertura}`
            })
        } else {
            await cobertura.deleteOne({ codigoCobertura });
            res.json({
                msg: `Cobertura eliminada con éxtio`
            });
        }

    } catch (error) {
        res.status(500).json({
            msg: `Error intentando eliminar Cobertura`
        });
    }

}
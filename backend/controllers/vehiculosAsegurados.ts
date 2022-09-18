import { Request, Response } from "express";
import { TipoVehiculo } from "../models/dataBase/tipoVehiculo";
import { VehiculoAsegurado } from "../models/dataBase/vehiculoAsegurado";

// @desc    Get Vehículo Asegurado
// @route   GET /api/vehiculosAsegurados/:patente
// @access  Private
export const getVehiculoAsegurado = async (req: Request, res: Response) => {

    const { patente } = req.params;

    const vehiculoAsegurado = await VehiculoAsegurado.findOne({ patente })
        .populate("tipoVehiculo");

    if (vehiculoAsegurado) {
        res.json(vehiculoAsegurado);
    } else {
        res.status(400).json({
            msg: `No existe vehículo asegurado con patente ${patente}`
        })
    }

}

// @desc    Get Tipo Vehículo por ID Vehículo Asegurado
// @route   GET /api/vehiculosAsegurados/tipoVehiculo/:id
// @access  Private
export const getIDTipoVehiculoByID = async (req: Request, res: Response) => {

    const { id } = req.params;

    const tipoVehiculo = await VehiculoAsegurado.findById(id).populate("tipoVehiculo");

    if (tipoVehiculo) {

        res.json({ tipoVehiculo: tipoVehiculo.tipoVehiculo._id });

    } else {
        res.status(400).json({
            msg: `No se pudo encontrar Vehículo Asegurado`
        })
    }

}

// @desc    Post Vehículo Asegurado
// @route   POST /api/vehiculosAsegurados
// @access  Private
export const postVehiculoAsegurado = async (req: Request, res: Response) => {

    const { body } = req;
    const { patente, color, fotos, vehiculo } = body;
    const { marca, modelo, version, año } = vehiculo;

    try {

        const tipoVehiculo = await TipoVehiculo.findOne({ marca, modelo, version, año });

        if (tipoVehiculo) {

            const vehiculoAsegurado = new VehiculoAsegurado({
                patente,
                color,
                fotos,
                tipoVehiculo: tipoVehiculo._id
            })

            await vehiculoAsegurado.save();
            res.json(vehiculoAsegurado);

        } else {
            res.status(500).json({
                msg: `TipoVehiculo no encontrado`
            });
        }


    } catch (error) {
        res.status(500).json({
            msg: `Error intentando crear VehículoAsegurado`
        });
    }

}

// @desc    Put Vehículo Asegurado
// @route   PUT /api/vehiculosAsegurados/:patente
// @access  Private
export const putVehiculoAsegurado = async (req: Request, res: Response) => {

    const { patente } = req.params;
    const { body } = req;

    try {

        const vehiculoAsegurado = await VehiculoAsegurado.findOne({ patente });

        if (!vehiculoAsegurado) {
            res.status(400).json({
                msg: `No existe VehículoAsegurado con patente ${patente}`
            })
        } else {
            await vehiculoAsegurado.updateOne(body);
            res.json({
                msg: `VehículoAsegurado actualizado con éxtio`
            });
        }

    } catch (error) {
        res.status(500).json({
            msg: `Error al actualizar VehículoAsegurado`
        });
    }

}

// @desc    Delete Vehículo Asegurado
// @route   DELETE /api/vehiculosAsegurados/:patente
// @access  Private
export const deleteVehiculoAsegurado = async (req: Request, res: Response) => {

    const { patente } = req.params;
    try {

        const vehiculoAsegurado = await VehiculoAsegurado.findOne({ patente });

        if (!vehiculoAsegurado) {
            res.status(400).json({
                msg: `No existe VehículoAsegurado con patente ${patente}`
            })
        } else {
            await vehiculoAsegurado.deleteOne({ patente });
            res.json({
                msg: `VehículoAsegurado eliminado con éxtio`
            });
        }

    } catch (error) {
        res.status(500).json({
            msg: `Error al eliminar VehículoAsegurado`
        });
    }

}
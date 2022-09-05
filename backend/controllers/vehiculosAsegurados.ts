import { Request, Response } from "express";
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
        res.status(404).json({
            msg: `No existe vehículo asegurado con patente ${patente}`
        })
    }

}
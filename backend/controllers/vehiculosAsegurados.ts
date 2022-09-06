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
        res.status(400).json({
            msg: `No existe vehículo asegurado con patente ${patente}`
        })
    }

}

// @desc    Post Vehículo Asegurado
// @route   POST /api/vehiculosAsegurados
// @access  Private
export const postVehiculoAsegurado = async (req: Request, res: Response) => {
}

// @desc    Put Vehículo Asegurado
// @route   PUT /api/vehiculosAsegurados/:patente
// @access  Private
export const putVehiculoAsegurado = async (req: Request, res: Response) => {

}

// @desc    Delete Vehículo Asegurado
// @route   DELETE /api/vehiculosAsegurados/:patente
// @access  Private
export const deleteVehiculoAsegurado = async (req: Request, res: Response) => {

}
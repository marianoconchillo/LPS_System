import { Request, Response } from "express";
import { TipoVehiculo } from "../models/dataBase/tipoVehiculo";

// @desc    Get Tipo Vehiculo
// @route   GET /api/tiposVehiculos/:marca/:modelo/:version/:anio
// @access  Private
export const getTipoVehiculo = async (req: Request, res: Response) => {

    const { marca, modelo, version, anio } = req.params;

    const tipoVehiculo = await TipoVehiculo.findOne({ marca, modelo, version, año: anio });

    if (tipoVehiculo) {
        res.json(tipoVehiculo);
    } else {
        res.status(400).json({
            msg: `No existe vehículo ${marca}, ${modelo}, ${anio}, ${version}`
        });
    }
}

// @desc    POST Tipo Vehiculo
// @route   POST /api/tiposVehiculos
// @access  Private
export const postTipoVehiculo = async (req: Request, res: Response) => {
}

// @desc    Put Tipo Vehiculo
// @route   PUT /api/tiposVehiculos/:marca/:modelo/:version/:anio
// @access  Private
export const putTipoVehiculo = async (req: Request, res: Response) => {
}

// @desc    Delete Tipo Vehiculo
// @route   DELETE /api/tiposVehiculos/:marca/:modelo/:version/:anio
// @access  Private
export const deleteTipoVehiculo = async (req: Request, res: Response) => {

}
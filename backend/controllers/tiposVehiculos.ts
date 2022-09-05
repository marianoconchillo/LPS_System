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
        res.status(404).json({
            msg: `No existe vehículo ${marca}, ${modelo}, ${anio}, ${version}`
        });
    }

    console.log(marca, modelo, version, anio);
}
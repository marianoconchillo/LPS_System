import { Request, Response } from "express";
import { Sucursal } from "../models/dataBase/sucursal";

// @desc    Get Sucursal
// @route   GET /api/sucursales/:numero
// @access  Private
export const getSucursal = async (req: Request, res: Response) => {

    const { numero } = req.params;

    const sucursal = await Sucursal.findOne({ numero });

    if (sucursal) {
        res.json(sucursal);
    } else {
        res.status(404).json({
            msg: `No existe sucursal número ${numero}`
        });
    }

}
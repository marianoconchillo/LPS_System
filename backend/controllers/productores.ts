import { Request, Response } from "express";
import { Productor } from "../models/dataBase/productor";
import { Sucursal } from "../models/dataBase/sucursal";

// @desc    Get Productor
// @route   GET /api/productores/:numeroProductor
// @access  Private
export const getProductor = async (req: Request, res: Response) => {

    const { numeroProductor } = req.params;

    const productor = await Productor.findOne({ numeroProductor }).populate("sucursal");

    if (productor) {
        res.json(productor);
    } else {
        res.status(404).json({
            msg: `No existe productor con número de productor ${numeroProductor}`
        })
    }

}
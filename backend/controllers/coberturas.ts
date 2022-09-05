import { Request, Response } from "express";
import { Cobertura } from "../models/dataBase/cobertura";

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
        res.status(404).json({
            msg: `No existe cobertura código ${codigoCobertura}`
        })
    }

}
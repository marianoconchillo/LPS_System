import { Request, Response } from "express"
import { Poliza } from "../models/dataBase/poliza";

// @desc    Get Póliza
// @route   GET /api/polizas/:numeroPoliza
// @access  Private
export const getPoliza = async (req: Request, res: Response) => {

    const { numeroPoliza } = req.params;

    const poliza = await Poliza.findOne({ numeroPoliza })
        .populate("productor")
        .populate("cliente")
        .populate("cobertura")
        .populate("vehiculoAsegurado");

    if (poliza) {
        res.json(poliza);
    } else {
        res.status(404).json({
            msg: `No existe póliza número ${numeroPoliza}`
        });
    }

}
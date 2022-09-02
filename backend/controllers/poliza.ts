import { Request, Response } from "express"
import { Poliza } from "../models/dataBase/poliza";

// @desc    Get Póliza
// @route   GET /api/poliza/:id
// @access  Private
export const getPoliza = async (req: Request, res: Response) => {

    const { id } = req.params;

    const poliza = await Poliza.findOne({ numeroPoliza: id })
        .populate("productor")
        .populate("cliente")
        .populate("vehiculoAsegurado");

    if (poliza) {
        res.json(poliza);
    } else {
        res.status(404).json({
            msg: `No existe póliza número ${id}`
        });
    }

}
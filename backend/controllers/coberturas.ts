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
        res.status(400).json({
            msg: `No existe cobertura código ${codigoCobertura}`
        })
    }

}

// @desc    Post Cobertura
// @route   POST /api/coberturas
// @access  Private
export const postCobertura = async (req: Request, res: Response) => {
}

// @desc    Put Cobertura
// @route   PUT /api/coberturas/:codigoCobertura
// @access  Private
export const putCobertura = async (req: Request, res: Response) => {
}

// @desc    Delete Cobertura
// @route   DELETE /api/coberturas/:codigoCobertura
// @access  Private
export const deleteCobertura = async (req: Request, res: Response) => {
}
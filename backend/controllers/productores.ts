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
        res.status(400).json({
            msg: `No existe productor con número de productor ${numeroProductor}`
        })
    }

}

// @desc    Post Productor
// @route   GET /api/productores
// @access  Private
export const postProductor = async (req: Request, res: Response) => {
}

// @desc    Put Productor
// @route   PUT /api/productores/:numeroProductor
// @access  Private
export const putProductor = async (req: Request, res: Response) => {
}

// @desc    Delete Productor
// @route   DELETE /api/productores/:numeroProductor
// @access  Private
export const deleteProductor = async (req: Request, res: Response) => {
}
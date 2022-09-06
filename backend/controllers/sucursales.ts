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
        res.status(400).json({
            msg: `No existe sucursal número ${numero}`
        });
    }

}

// @desc    Post Sucursal
// @route   POST /api/sucursales
// @access  Private
export const postSucursal = async (req: Request, res: Response) => {
}

// @desc    Put Sucursal
// @route   PUT /api/sucursales/:numero
// @access  Private
export const putSucursal = async (req: Request, res: Response) => {
}

// @desc    Delete Sucursal
// @route   DELETE /api/sucursales/:numero
// @access  Private
export const deleteSucursal = async (req: Request, res: Response) => {
}
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

    const { body } = req;

    try {

        const sucursal = new Sucursal(body);
        await sucursal.save();

        res.json(sucursal);

    } catch (error) {
        res.status(500).json({
            msg: `Error intentando crear Sucursal`
        });
    }

}

// @desc    Put Sucursal
// @route   PUT /api/sucursales/:numero
// @access  Private
export const putSucursal = async (req: Request, res: Response) => {

    const { numero } = req.params;
    const { body } = req;

    try {

        const sucursal = await Sucursal.findOne({ numero });

        if (!sucursal) {
            res.status(400).json({
                msg: `No existe Sucursal con número ${sucursal}`
            })
        } else {
            await sucursal.updateOne(body);
            res.json({
                msg: `Sucursal actualizada correctamente`
            });
        }

    } catch (error) {
        res.status(500).json({
            msg: `Error intentando actualizar Sucursal`
        });
    }

}

// @desc    Delete Sucursal
// @route   DELETE /api/sucursales/:numero
// @access  Private
export const deleteSucursal = async (req: Request, res: Response) => {

    const { numero } = req.params;

    try {

        const sucursal = await Sucursal.findOne({ numero });

        if (!sucursal) {
            res.status(400).json({
                msg: `No existe Sucursal con número ${sucursal}`
            })
        } else {
            await sucursal.deleteOne({ numero });
            res.json({
                msg: `Sucursal eliminada correctamente`
            });
        }

    } catch (error) {
        res.status(500).json({
            msg: `Error intentando actualizar Sucursal`
        });
    }
}
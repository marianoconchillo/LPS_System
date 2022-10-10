import { Request, Response } from "express";
import { Productor } from "../models/dataBase/productor";
import { Sucursal } from "../models/dataBase/sucursal";
import { numeroProductorValido } from "../utils/verifications";

// @desc    Get Productor
// @route   GET /api/productores/:numeroProductor
// @access  Private
export const getProductor = async (req: Request, res: Response) => {

    const { numeroProductor } = req.params;

    if (numeroProductorValido(numeroProductor)) {
        const productor = await Productor.findOne({ numeroProductor }).populate("sucursal");

        if (productor) {
            res.json(productor);
        } else {
            res.status(400).json({
                msg: `No existe productor con número de productor ${numeroProductor}`
            })
        }
    } else {
        res.status(400).json({
            msg: `Número de productor inválido`
        })
    }


}

// @desc    Post Productor
// @route   GET /api/productores
// @access  Private
export const postProductor = async (req: Request, res: Response) => {

    const { numeroProductor, sucursal, nombre, apellido, email, dni } = req.body;

    try {

        const sucursal_productor = await Sucursal.findOne({ numero: sucursal });

        if (sucursal_productor) {
            const productor = new Productor({
                numeroProductor,
                nombre,
                apellido,
                email,
                dni,
                sucursal: sucursal_productor._id
            });
            await productor.save();
            res.json(productor);
        } else {
            res.status(400).json({
                msg: `Sucursal número ${sucursal} no encontrada`
            })
        }

    } catch (error) {
        res.status(500).json({
            msg: `Error intentando crear Productor`
        });
    }

}

// @desc    Put Productor
// @route   PUT /api/productores/:numeroProductor
// @access  Private
export const putProductor = async (req: Request, res: Response) => {

    const { numeroProductor } = req.params;
    const { body } = req;

    try {

        const productor = await Productor.findOne({ numeroProductor });

        if (!productor) {
            res.status(400).json({
                msg: `No existe Productor con número ${numeroProductor}`
            })
        } else {
            await productor.updateOne(body);
            res.json({
                msg: `Productor actualizado con éxtio`
            });
        }


    } catch (error) {
        res.status(500).json({
            msg: `Error al actualizar Productor`
        });
    }

}

// @desc    Delete Productor
// @route   DELETE /api/productores/:numeroProductor
// @access  Private
export const deleteProductor = async (req: Request, res: Response) => {

    const { numeroProductor } = req.params;

    try {

        const productor = await Productor.findOne({ numeroProductor });

        if (!productor) {
            res.status(400).json({
                msg: `No existe Productor con número ${numeroProductor}`
            })
        } else {
            await productor.deleteOne({ numeroProductor });
            res.json({
                msg: `Productor eliminado con éxtio`
            });
        }

    } catch (error) {
        res.status(500).json({
            msg: `Productor intentando eliminar Cliente`
        });
    }

}
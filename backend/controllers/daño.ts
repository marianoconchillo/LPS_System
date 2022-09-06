import { Request, Response } from "express";
import { Daño } from "../models/dataBase/daño";

// @desc    Get Daño
// @route   GET /api/danios/:nombre
// @access  Private
export const getDaño = async (req: Request, res: Response) => {

    const { nombre } = req.params;

    const daño = await Daño.findOne({ nombre });

    if (daño) {
        res.json(daño);
    } else {
        res.status(400).json({
            msg: `No existe daño con nombre ${nombre}`
        });
    }

}

// @desc    Post Daño
// @route   POST /api/danios
// @access  Private
export const postDaño = async (req: Request, res: Response) => {

    const { body } = req;

    try {

        const daño = new Daño(body);
        await daño.save();

        res.json(daño);

    } catch (error) {
        res.status(500).json({
            msg: `Error intentando crear Daño`
        });
    }

}

// @desc    Put Daño
// @route   PUT /api/danios/:nombre
// @access  Private
export const putDaño = async (req: Request, res: Response) => {

    const { nombre } = req.params;
    const { body } = req;

    try {

        const daño = await Daño.findOne({ nombre });

        if (!daño) {
            res.status(400).json({
                msg: `No existe Daño con nombre ${nombre}`
            })
        } else {
            await daño.updateOne(body);
            res.json({
                msg: `Daño actualizado con éxtio`
            });
        }


    } catch (error) {
        res.status(500).json({
            msg: `Error al actualizar Daño`
        });
    }

}

// @desc    Delete Daño
// @route   DELETE /api/danios/:nombre
// @access  Private
export const deleteDaño = async (req: Request, res: Response) => {

    const { nombre } = req.params;

    try {

        const daño = await Daño.findOne({ nombre });

        if (!daño) {
            res.status(400).json({
                msg: `No existe Daño con nombre ${nombre}`
            })
        } else {
            await daño.deleteOne({ nombre });
            res.json({
                msg: `Daño eliminado con éxtio`
            });
        }

    } catch (error) {
        res.status(500).json({
            msg: `Error intentando eliminar Daño`
        });
    }

}
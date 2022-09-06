import { Request, Response } from "express";
import { Cliente } from "../models/dataBase/cliente";

// @desc    Get Cliente
// @route   GET /api/clientes/:dni
// @access  Private
export const getCliente = async (req: Request, res: Response) => {

    const { dni } = req.params;

    const cliente = await Cliente.findOne({ dni });

    if (cliente) {
        res.json(cliente);
    } else {
        res.status(400).json({
            msg: `No existe usuario con dni ${dni}`
        })
    }
}

// @desc    Post Cliente
// @route   POST /api/clientes
// @access  Private
export const postCliente = async (req: Request, res: Response) => {

    const { body } = req;

    try {

        const cliente = new Cliente(body);
        await cliente.save();

        res.json(cliente);

    } catch (error) {
        res.status(500).json({
            msg: `Error intentando crear Cliente`
        });
    }

}

// @desc    Put Cliente
// @route   PUT /api/clientes/:dni
// @access  Private
export const putCliente = async (req: Request, res: Response) => {

    const { dni } = req.params;
    const { body } = req;

    try {

        const cliente = await Cliente.findOne({ dni });

        if (!cliente) {
            res.status(400).json({
                msg: `No existe usuario con dni ${dni}`
            })
        } else {
            await cliente.updateOne(body);
            res.json({
                msg: `Cliente actualizado con éxtio`
            });
        }


    } catch (error) {
        res.status(500).json({
            msg: `Error actualizar crear Cliente`
        });
    }

}

// @desc    Delete Cliente
// @route   DELETE /api/clientes/:id
// @access  Private
export const deleteCliente = async (req: Request, res: Response) => {

    const { dni } = req.params;

    try {

        const cliente = await Cliente.findOne({ dni });

        if (!cliente) {
            res.status(400).json({
                msg: `No existe usuario con dni ${dni}`
            })
        } else {
            await cliente.deleteOne({ dni });
            res.json({
                msg: `Cliente eliminado con éxtio`
            });
        }

    } catch (error) {
        res.status(500).json({
            msg: `Error intentando eliminar Cliente`
        });
    }

}

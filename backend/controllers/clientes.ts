import { Request, Response } from "express";
import { Cliente } from "../models/dataBase/cliente";

// @desc    Get Cliente
// @route   GET /api/clientes/:id
// @access  Private
export const getCliente = async (req: Request, res: Response) => {

    const { id } = req.params;

    const cliente = await Cliente.findOne({ dni: id });

    if (cliente) {
        res.json(cliente);
    } else {
        res.status(404).json({
            msg: `No existe usuario con dni ${id}`
        })
    }


}


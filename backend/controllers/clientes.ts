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
        res.status(404).json({
            msg: `No existe usuario con dni ${dni}`
        })
    }


}


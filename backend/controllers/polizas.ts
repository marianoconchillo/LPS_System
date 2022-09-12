import { Request, Response } from "express"
import { Cliente } from "../models/dataBase/cliente";
import { Cobertura } from "../models/dataBase/cobertura";
import { EstadoCuota, ICuota, Poliza } from "../models/dataBase/poliza";
import { Productor } from "../models/dataBase/productor";

// @desc    Get Póliza
// @route   GET /api/polizas/:numeroPoliza
// @access  Private
export const getPoliza = async (req: Request, res: Response) => {

    const { numeroPoliza } = req.params;

    const poliza = await Poliza.findOne({ numeroPoliza })
        .populate("productor")
        .populate("cliente")
        .populate("cobertura")
        .populate("vehiculoAsegurado");

    if (poliza) {
        res.json(poliza);
    } else {
        res.status(400).json({
            msg: `No existe póliza número ${numeroPoliza}`
        });
    }

}

// @desc    Get Póliza con DNI del Cliente y patente
// @route   GET /api/polizas/:dni/:patente
// @access  Private
export const getPolizaByDniPatente = async (req: Request, res: Response) => {

    const { dni, patente } = req.params;

    const poliza = await Poliza.findOne()
        .populate({
            path: "vehiculoAsegurado",
            match: { patente: { $eq: patente } }
        })
        .populate({
            path: "cliente",
            match: { dni: { $eq: dni } }
        });

    if (poliza && poliza.vehiculoAsegurado !== null && poliza.cliente !== null) {
        res.json(poliza);
    } else {
        res.json({});
    }

}

// @desc    Get Cuotas vencidas con DNI del Cliente
// @route   GET /api/polizas/cuotas-vencidas/:dni
// @access  Private
export const getCuotasVencidas = async (req: Request, res: Response) => {

    const { dni } = req.params;

    const cliente = await Cliente.findOne({ dni });

    if (cliente) {

        const polizas = await Poliza.find({ cliente: cliente._id });

        let cuotasVencidas: ICuota[] = [];
        let i = 0;

        while (i < polizas.length) {
            const cuota1: ICuota = polizas[i].cuotas[i];
            const cuota2: ICuota = polizas[i].cuotas[i + 1];
            const cuota3: ICuota = polizas[i].cuotas[i + 2];

            if (cuota1.estado === EstadoCuota.vencida) {
                cuotasVencidas.push(cuota1);
            }

            if (cuota2.estado === EstadoCuota.vencida) {
                cuotasVencidas.push(cuota1);
            }

            if (cuota3.estado === EstadoCuota.vencida) {
                cuotasVencidas.push(cuota1);
            }

            i++;
        }

        res.json(cuotasVencidas);

    } else {
        res.status(400).json({
            msg: `No existe Cliente ${dni}`
        });
    }

}

// @desc    Post Póliza
// @route   POST /api/polizas
// @access  Private
export const postPoliza = async (req: Request, res: Response) => {

    const { productor, cliente, cobertura, vehiculoAsegurado } = req.body;

    const numeroPoliza = await Poliza.countDocuments() + 1;
    const fechaInicio = new Date();
    const fechaFin = new Date(new Date().setMonth(fechaInicio.getMonth() + 3));
    const precioCobertura = await Cobertura.findById(cobertura);

    try {

        if (precioCobertura) {

            const cuotas: ICuota[] = [];

            for (let i = 0; i < 3; i++) {
                const cuota: ICuota = {
                    numero: i + 1,
                    estado: EstadoCuota.pagar,
                    importe: precioCobertura.precio,
                    fecha: new Date(new Date().setMonth(fechaInicio.getMonth() + i))
                }
                cuotas.push(cuota);
            }

            const poliza = new Poliza({
                numeroPoliza,
                fechaInicio,
                fechaFin,
                productor,
                cliente,
                cobertura,
                vehiculoAsegurado,
                cuotas
            });

            await poliza.save();
            res.json(poliza);

        } else {
            res.status(400).json({
                msg: `Error al buscar Cobertura`
            });
        }

    } catch (error) {
        res.status(500).json({
            msg: `Error intentando crear Póliza`
        });
    }
}

// @desc    Put Póliza
// @route   GET /api/polizas/:numeroPoliza
// @access  Private
export const putPoliza = async (req: Request, res: Response) => {
}

// @desc    Delete Póliza
// @route   GET /api/polizas/:numeroPoliza
// @access  Private
export const deletePoliza = async (req: Request, res: Response) => {
}
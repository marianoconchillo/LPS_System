import { Request, Response } from "express"
import { Cliente } from "../models/dataBase/cliente";
import { Cobertura } from "../models/dataBase/cobertura";
import { EstadoCuota, ICuota, IPoliza, Poliza } from "../models/dataBase/poliza";
import { VehiculoAsegurado } from "../models/dataBase/vehiculoAsegurado";
import { patenteValida } from "../utils/verifications";

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

// @desc    Get Póliza con patente
// @route   GET /api/polizas/vehiculoAsegurado/:patente
// @access  Private
export const getPolizasVigentesByPatente = async (req: Request, res: Response) => {

    const { patente } = req.params;

    if (patenteValida(patente)) {

        const vehiculoAsegurado = await VehiculoAsegurado.findOne({ patente });

        if (vehiculoAsegurado) {

            const polizas = await Poliza.find({ vehiculoAsegurado: vehiculoAsegurado._id });

            if (polizas.length > 0) {
                const today = new Date();
                let i: number = 0;
                let vigente: boolean = false;

                while (i < polizas.length && !vigente) {
                    if (polizas[i].fechaFin >= today) {
                        vigente = true;
                        res.json(polizas[i]);
                    }
                    i++;
                }

                res.json({ msg: `Vehículo ${patente} sin pólizas vigentes` });

            } else {
                res.json({ msg: `Vehículo ${patente} sin pólizas asociadas` });
            }

        } else {
            res.json({ msg: `No existe Vehículo Asegurado con patente ${patente}` });
        }
    } else {
        res.status(400).json({
            msg: `Patente inválida`
        });
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
        let i: number = 0;
        let j: number = 0;

        while (i < polizas.length) {

            const { cuotas } = polizas[i];

            while (j < cuotas.length) {
                const cuota: ICuota = cuotas[i];
                if (cuota.estado === EstadoCuota.vencida) {
                    cuotasVencidas.push(cuota);
                }
                j++;
            }
            i++;
        }

        if (cuotasVencidas.length > 0) {
            res.json(cuotasVencidas);
        } else {
            res.json({ msg: `Asegurado ${dni} no tiene cuotas vencidas` });
        }

    } else {
        res.status(400).json({
            msg: `No existe Cliente ${dni}`
        });
    }

}

// @desc    Get Pólizas con ID del Cliente
// @route   GET /api/polizas/cliente/:id
// @access  Private
export const getPolizasByIdCliente = async (req: Request, res: Response) => {

    const { id } = req.params;

    const polizas = await Poliza.find({ cliente: id })
        .populate({
            path: "productor",
            populate: { path: "sucursal" }
        })
        .populate({
            path: "cobertura",
            populate: { path: "daños" }
        })
        .populate({
            path: "vehiculoAsegurado",
            populate: { path: "tipoVehiculo" }
        });

    if (polizas.length > 0) {

        res.json(polizas);

    } else {
        res.status(400).json({
            msg: `Cliente no encontrado o sin Pólizas`
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
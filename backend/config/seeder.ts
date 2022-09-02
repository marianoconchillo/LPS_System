import { cliente, cobertura, daño, poliza, productor, sucursal, tipoVehiculo, vehiculoAsegurado } from "../data/data";
import { Sucursal, ISucursal } from "../models/dataBase/sucursal";
import { Daño, IDaño } from "../models/dataBase/daño";
import { TipoVehiculo, ITipoVehiculo } from "../models/dataBase/tipoVehiculo";
import { Cliente, ICliente } from "../models/dataBase/cliente";
import { Productor, IProductor } from "../models/dataBase/productor";
import { VehiculoAsegurado, IVehiculoAsegurado } from "../models/dataBase/vehiculoAsegurado";
import { Cobertura, ICobertura } from "../models/dataBase/cobertura";
import { Poliza, IPoliza } from "../models/dataBase/poliza";


export const importData = async () => {

    try {

        // Elimino todo
        await deleteMany();

        // Inserto Sucursal
        const createdSucursal = await Sucursal.insertMany<ISucursal>(sucursal);

        // Inserto Daño
        const createdDaño = await Daño.insertMany<IDaño>(daño);

        // Inserto TipoVehiculo
        const createdTipoVehiculo = await TipoVehiculo.insertMany<ITipoVehiculo>(tipoVehiculo);

        // Inserto Cliente
        const createdCliente = await Cliente.insertMany<ICliente>(cliente);

        // Inserto Productor
        productor.sucursal = createdSucursal[0]._id;
        const createdProductor = await Productor.insertMany<IProductor>(productor);

        // Inserto VehiculoAsegurado
        vehiculoAsegurado.tipoVehiculo = createdTipoVehiculo[0]._id;
        const createdVehiculoAsegurado = await VehiculoAsegurado.insertMany<IVehiculoAsegurado>(vehiculoAsegurado);

        // Inserto Cobertura
        cobertura.daños[0] = createdDaño[0]._id;
        cobertura.vehiculos[0] = createdTipoVehiculo[0]._id;
        const createdCobertura = await Cobertura.insertMany<ICobertura>(cobertura);

        // Inserto Poliza
        poliza.cliente = createdCliente[0]._id;
        poliza.cobertura = createdCobertura[0]._id;
        poliza.productor = createdProductor[0]._id;
        poliza.vehiculoAsegurado = createdVehiculoAsegurado[0]._id;
        await Poliza.insertMany<IPoliza>(poliza);

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

const deleteMany = async () => {
    await Sucursal.deleteMany();
    await Daño.deleteMany();
    await TipoVehiculo.deleteMany();
    await Cliente.deleteMany();
    await Productor.deleteMany();
    await VehiculoAsegurado.deleteMany();
    await Cobertura.deleteMany();
    await Poliza.deleteMany();
}
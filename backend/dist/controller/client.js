"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCliente = void 0;
const getCliente = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: "getUsuarios",
        id
    });
};
exports.getCliente = getCliente;
//# sourceMappingURL=client.js.map
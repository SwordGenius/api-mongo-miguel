const UsuarioModel = require("../models/usuario.model");

const create = async (req, res) => {
try {
        const usuario = new UsuarioModel({
            nombre: req.body.nombre,
            apellidoPaterno: req.body.apellidoPaterno,
            apellidoMaterno: req.body.apellidoMaterno,
            matricula: req.body.matricula
        });

        await usuario.save();

        return res.status(201).json({
            message: "usuario creado exitosamente",
            usuario
        });
    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al crear el usuario",
            error: error.message
        });
    }
}

module.exports = {
    create,
}
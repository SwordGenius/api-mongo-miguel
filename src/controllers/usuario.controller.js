const UsuarioModel = require("../models/usuario.model");

const create = async (req, res) => {
try {
        const usuario = new UsuarioModel({
            nombre: req.body.nombre,
            apellidoPaterno: req.body.apellidoPaterno,
            apellidoMaterno: req.body.apellidoMaterno,
            matricula: req.body.matricula,
            _id: req.body._id,
        });

        await usuario.save();

        return res.status(201).json({
            message: "usuario creado exitosamente",
            usuario: {
                _id: usuario._id,
                nombre: usuario.nombre,
                apellidoPaterno: usuario.apellidoPaterno,
                apellidoMaterno: usuario.apellidoMaterno,
                matricula: usuario.matricula,
                deleted: usuario.deleted,
                created_at: usuario.created_at,
                updated_at: usuario.updated_at,
                deleted_at: usuario.deleted_at
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al crear el usuario",
            error: error.message
        });
    }
}

const index = async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const offset = (page - 1) * limit;
        const {sort, order} = req.query;

        const usuarios = await UsuarioModel.find({deleted: false}).limit(limit)
            .skip(offset).sort({[sort]: order});

        let response = {
            message: "usuarios obtenidos exitosamente",
            data: usuarios
        };

        if (page && limit) {
            const totalUsuarios = await UsuarioModel.countDocuments({deleted: false});
            response = {
                ...response,
                total: totalUsuarios,
                totalPages: Math.ceil(totalUsuarios / limit),
                currentPage: page
            };
        }

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al obtener los usuarios",
            error: error.message
        });
    }
}

const getById = async (req, res) => {
    try {
        const usuarioId = req.params.id;// localhost:3300/usuarios/"id"
        const usuario = await UsuarioModel.findById(usuarioId);
        if (!usuario) {
            return res.status(404).json({
                message: "no se encontró el usuario",
            });
        }
        return res.status(200).json({
            message: "usuario encontrado exitosamente",
            usuario
        });
    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al obtener el usuario",
            error: error.message
        });
    }
}


const updatePartial = async (req, res) => {
    try {
        const usuarioId = req.params.id;
        const usuario = {
            ...req.body,
            updated_at: new Date()
        };
        const usuarioFound = await UsuarioModel.findByIdAndUpdate(usuarioId, usuario);
        if (!usuarioFound) {
            return res.status(404).json({
                message: "no se encontró el usuario",
            });
        }
        return res.status(200).json({
            message: "usuario actualizado exitosamente",
        });
    }catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al actualizar el usuario",
            error: error.message
        });
    }
}

const updateTotal = async (req, res) => {
    try {
        const usuarioId = req.params.id;
        const usuario = {
            nombre: req.body.nombre || null,
            apellidoPaterno: req.body.apellidoPaterno || null,
            apellidoMaterno: req.body.apellidoMaterno || null,
            matricula: req.body.matricula || null,
            updated_at: new Date()
        };
        const usuarioFound = await UsuarioModel.findByIdAndUpdate(usuarioId, usuario);
        if (!usuarioFound) {
            return res.status(404).json({
                message: "no se encontró el usuario",
            });
        }
        return res.status(200).json({
            message: "usuario actualizado exitosamente",
        });
    }catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al actualizar el usuario",
            error: error.message
        });
    }
}

const deleteById = async (req, res) => {
    try {
        const usuarioId = req.params.id;
        const usuario = {
            deleted: true,
            deleted_at: new Date()
        };
        const usuarioFound = await UsuarioModel.findByIdAndUpdate(usuarioId, usuario);
        if (!usuarioFound) {
            return res.status(404).json({
                message: "no se encontró el usuario",
            });
        }
        return res.status(200).json({
            message: "usuario eliminado exitosamente",
        });
    }catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al eliminar el usuario",
            error: error.message
        });
    }
}

module.exports = {
    create,
    index,
    getById,
    patch: updatePartial,
    put: updateTotal
}
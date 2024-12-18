import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const getAllUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const users = await User.find()
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const totalUsers = await User.countDocuments();

        if (!users.length) {
            return res.status(404).json({
                ok: false,
                msg: "No se encontraron usuarios"
            });
        }

        res.status(200).json({
            ok: true,
            msg: "Usuarios obtenidos correctamente",
            users,
            totalPages: Math.ceil(totalUsers / limit),
            currentPage: Number(page)
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error al obtener los usuarios",
            error: error.message
        });
    }
}

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const user = await User.findById(id)

        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: "No se encontró el usuario"
            });
        }

        res.status(200).json({
            ok: true,
            msg: "Usuario obtenido correctamente",
            user
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error al obtener el usuario",
            error: error.message
        });
    }
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, age } = req.body;

        // Construir el objeto de actualización dinámicamente
        const updateData = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (password) {
            const salt = bcryptjs.genSaltSync();
            updateData.password = bcryptjs.hashSync(password, salt);
        }
        if (age) updateData.age = age;

        const user = await User.findByIdAndUpdate(id, updateData, { new: true });

        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: "No se encontró el usuario"
            });
        }

        res.status(200).json({
            ok: true,
            msg: "Usuario actualizado correctamente",
            user
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error al actualizar el usuario",
            error: error.message
        });
    }
}

export const deactivateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, { isActive: false }, { new: true });

        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: "No se encontró el usuario"
            });
        }

        res.status(200).json({
            ok: true,
            msg: "Usuario desactivado correctamente",
            user
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error al desactivar el usuario",
            error: error.message
        });
    }
}

export const activateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, { isActive: true }, { new: true });

        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: "No se encontró el usuario"
            });
        }

        res.status(200).json({
            ok: true,
            msg: "Usuario activado correctamente",
            user
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error al activar el usuario",
            error: error.message
        });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: "No se encontró el usuario"
            });
        }

        res.status(200).json({
            ok: true,
            msg: "Usuario eliminado correctamente",
            user
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error al eliminar el usuario",
            error: error.message
        });
    }
}

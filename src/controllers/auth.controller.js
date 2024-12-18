import { generateJWT } from "../helpers/generate-jwt.helper.js";
import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const createUser = async (req, res) => {
    try {
        const { name, email, password, age } = req.body;
        const user = new User({ name, email, password, age });

        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);

        await user.save();
        res.status(201).json({
            ok: true,
            msg: "Usuario creado correctamente",
            user
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error al crear el usuario",
            error: error.message
        });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                ok: false,
                msg: "Credenciales incorrectas - email"
            });
        }

        if (!user.isActive) {
            return res.status(401).json({
                ok: false,
                msg: "Credenciales incorrectas - usuario no activo"
            });
        }

        const validPassword = bcryptjs.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(401).json({
                ok: false,
                msg: "Credenciales incorrectas - password"
            });
        }

        const token = await generateJWT(user.id);

        res.status(200).json({
            ok: true,
            msg: "Usuario logueado correctamente",
            token,
            user
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error al iniciar sesión",
            error: error.message
        });
    }
}

export const regenerateJWT = async (req, res) => {
    try {
       const userAuth = req.authUser;

       const token = await generateJWT(userAuth.id);

       res.status(200).json({
        ok: true,
        msg: "Token regenerado correctamente",
        token,
        user: userAuth
       });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error al regenerar el token",
            error: error.message
        });
    }
}

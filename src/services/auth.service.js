import { generateJWT } from "../helpers/generate-jwt.helper.js";
import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { STATUS_CODES, MESSAGES } from "../constants/response.constants.js";

export const createUser = async (req, res) => {
    try {
        const { name, email, password, age } = req.body;
        const user = new User({ name, email, password, age });

        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);

        await user.save();
        res.status(STATUS_CODES.CREATED).json({
            ok: true,
            msg: MESSAGES.USER_CREATED,
            user
        });
    } catch (error) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            ok: false,
            msg: MESSAGES.ERROR_CREATING_USER,
            error: error.message
        });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(STATUS_CODES.UNAUTHORIZED).json({
                ok: false,
                msg: MESSAGES.INVALID_CREDENTIALS_EMAIL
            });
        }

        if (!user.isActive) {
            return res.status(STATUS_CODES.UNAUTHORIZED).json({
                ok: false,
                msg: MESSAGES.INVALID_CREDENTIALS_INACTIVE
            });
        }

        const validPassword = bcryptjs.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(STATUS_CODES.UNAUTHORIZED).json({
                ok: false,
                msg: MESSAGES.INVALID_CREDENTIALS_PASSWORD
            });
        }

        const token = await generateJWT(user.id);

        res.status(STATUS_CODES.OK).json({
            ok: true,
            msg: MESSAGES.LOGIN_SUCCESS,
            token,
            user
        });
    } catch (error) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            ok: false,
            msg: MESSAGES.ERROR_LOGIN,
            error: error.message
        });
    }
}

export const regenerateJWT = async (req, res) => {
    try {
       const userAuth = req.authUser;

       const token = await generateJWT(userAuth.id);

       res.status(STATUS_CODES.OK).json({
        ok: true,
        msg: MESSAGES.TOKEN_REGENERATED,
        token,
        user: userAuth
       });
    } catch (error) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            ok: false,
            msg: MESSAGES.ERROR_REGENERATING_TOKEN,
            error: error.message
        });
    }
}
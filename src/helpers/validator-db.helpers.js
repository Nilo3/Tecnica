import { User } from "../models/user.model.js";

export const validateEmail = async (email = "") => {
    const existEmail = await User.findOne({ email });

    if (existEmail) {
        throw new Error(`El email ${email} ya se encuentra registrado`);
    }
}

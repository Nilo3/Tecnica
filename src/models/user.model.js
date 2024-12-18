import { model, Schema } from "mongoose"

const schemaUser = Schema({
    name: {
        type: String,
        required: [true, "El nombre es requerido"],
        maxLength: [30, "El nombre no puede tener más de 30 caracteres"],
        minLength: [3, "El nombre no puede tener menos de 3 caracteres"]
    },
    email: {
        type: String,
        required: [true, "El email es requerido"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "La contraseña es requerida"],
        minLength: [8, "La contraseña no puede tener menos de 8 caracteres"]
    },
    age: {
        type: Number,
        required: [true, "La edad es requerida"],
        min: [0, "La edad no puede ser menor a 0"]
    },
    isActive: {
        type: Boolean,
        default: true
    }
})

schemaUser.methods.toJSON = function () {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
}

export const User = model("User", schemaUser);

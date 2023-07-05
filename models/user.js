import { Schema, model } from "mongoose";

const UserSchema = new Schema ({
    name: String,
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        select: false,
    },
    createAt: {
        type: Date,
        default: Date.now(),
    }
})

export const User = model("User", UserSchema);
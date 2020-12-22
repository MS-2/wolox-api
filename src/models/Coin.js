
import { Schema, model } from 'mongoose'

const coinSchema = new Schema({
    simbolo: { type: String, required: true },
    precio: { type: String, required: true },
    nombre: { type: String, required: true },
    icono: { type: String, required: true },
    user: { type: Schema.ObjectId, ref: "user" }
}, {
    timestamps: true,
    versionKey: false
})

export default model('coin', coinSchema)
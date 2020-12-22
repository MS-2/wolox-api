import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    nombre: {
      type: String, required: true
    },

    apellido: {
      type: String, required: true
    },

    username: {
      type: String, unique: true, lowercase: true, required: true
    },

    password: {
      type: String, required: true, min: 8, max: 16
    },

    moneda: {
      type: String, enum: ['eur', 'usd', 'ars'],
    },

    coins: [{ type: Schema.ObjectId, ref: 'coin', autopopulate: true }],

  },
  {
    timestamps: true,
    versionKey: false,
  }
);
//plugin de mongoose para que haga el pupulado automatico en las colecciones especificadas
userSchema.plugin(require('mongoose-autopopulate'));

userSchema.statics.encryptPassword = async (pass) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(pass, salt);
};

userSchema.statics.comparePassword = async (pass, receivedPassword) => {
  return await bcrypt.compare(pass, receivedPassword)
}

export default model("user", userSchema);

import { Schema, model } from "mongoose";

const collection = "users";

const schema = new Schema(
   {
      email: { type: String, required: true, unique: true },
      photo: {
         type: String,
         default:
            "https://img.freepik.com/vector-premium/icono-circulo-usuario-anonimo-ilustracion-vector-estilo-plano-sombra_520826-1931.jpg",
      },
      password: { type: String, required: true },
      role: { type: String },
   },
   {
      timestamps: true,
   }
);

const User = model(collection, schema);
export default User;

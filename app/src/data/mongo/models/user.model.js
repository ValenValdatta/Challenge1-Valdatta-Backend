import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const collection = "users";

const schema = new Schema(
   {
      email: { type: String, required: true, unique: true, index: true },
      photo: {
         type: String,
         default:
            "https://img.freepik.com/vector-premium/icono-circulo-usuario-anonimo-ilustracion-vector-estilo-plano-sombra_520826-1931.jpg",
      },
      password: { type: String, required: true },
      age: { type: Number },
      role: { type: Number, default: 0, index: true },
   },
   {
      timestamps: true,
   }
);

schema.plugin(mongoosePaginate);


const User = model(collection, schema);
export default User;
